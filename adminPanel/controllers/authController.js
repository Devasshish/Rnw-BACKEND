const User = require('../models/User');
const passport = require('passport');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

exports.getLogin = (req, res) => res.render('auth/login', { layout: false });

exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
};

exports.getRegister = (req, res) => res.render('auth/register', { layout: false });

exports.postRegister = async (req, res) => {
    const { name, email, password } = req.body;
    let errors = [];
    if (!name || !email || !password) errors.push({ msg: 'Please enter all fields' });
    if (password.length < 6) errors.push({ msg: 'Password must be at least 6 characters' });
    if (errors.length > 0) {
        res.render('auth/register', { errors, name, email, password, layout: false });
    } else {
        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                errors.push({ msg: 'Email already exists' });
                res.render('auth/register', { errors, name, email, password, layout: false });
            } else {
                const newUser = new User({ name, email, password });
                await newUser.save();
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/auth/login');
            }
        } catch (error) {
            console.error(error);
            req.flash('error_msg', 'Something went wrong');
            res.redirect('/auth/register');
        }
    }
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    });
};

exports.getForgot = (req, res) => res.render('auth/forgot', { layout: false });

exports.postForgot = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            req.flash('error_msg', 'No account with that email address exists.');
            return res.redirect('/auth/forgot');
        }
        const otp = crypto.randomInt(100000, 999999).toString();
        user.resetPasswordOtp = otp;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        await sendEmail({ email: user.email, subject: 'Password Reset OTP', message: `Your password reset OTP is ${otp}. It is valid for 1 hour.` });
        req.flash('success_msg', 'An e-mail has been sent with an OTP.');
        res.redirect('/auth/reset');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error sending email.');
        res.redirect('/auth/forgot');
    }
};

exports.getReset = (req, res) => res.render('auth/reset', { layout: false });

exports.postReset = async (req, res) => {
    try {
        const user = await User.findOne({
            resetPasswordOtp: req.body.otp,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            req.flash('error_msg', 'Password reset OTP is invalid or has expired.');
            return res.redirect('/auth/reset');
        }
        if (req.body.password !== req.body.confirmPassword) {
            req.flash('error_msg', 'Passwords do not match.');
            return res.redirect('/auth/reset');
        }
        user.password = req.body.password;
        user.resetPasswordOtp = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        req.flash('success_msg', 'Success! Your password has been changed.');
        res.redirect('/auth/login');
    } catch (err) {
        req.flash('error_msg', 'Something went wrong.');
        res.redirect('/auth/reset');
    }
};
