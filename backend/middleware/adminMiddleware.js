// adminMiddleware.js
exports.admin = (req, res, next) => {
  // protect must run before admin middleware so req.user exists
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Require admin role' });
};

module.exports = { admin };
