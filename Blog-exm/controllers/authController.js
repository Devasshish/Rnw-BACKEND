const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register user
exports.getRegister = (req, res) => {
  res.render('register', { user: req.user });
};

// register user
exports.postRegister = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { user: req.user, error: 'Username is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user'
    });

    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
// login user

exports.getLogin = (req, res) => {
  res.render('login', { user: req.user });
};

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
      return res.render('login', { user: req.user, error: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { user: req.user, error: 'Invalid username or password.' });
    }

    const payload = {
      id: user._id,
      role: user.role,
      username: user.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// logout user
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};
