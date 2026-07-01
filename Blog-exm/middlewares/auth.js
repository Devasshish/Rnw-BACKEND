const jwt = require('jsonwebtoken');
// check user 
const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

// require auth
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
};

// require admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Access denied. Admin only.');
  }
  next();
};

module.exports = { auth, requireAuth, requireAdmin };
