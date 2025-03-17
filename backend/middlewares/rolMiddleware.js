module.exports = (roles) => (req, res, next) => {
  if (!roles.includes(req.rol)) {
    return res.status(403).send('Forbidden');
  }
  next();
};