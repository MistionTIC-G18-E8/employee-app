const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config').SECRET_KEY;

// Only call next when the user is authenticated
const verifyToken = (req, res, next) => {
  console.log('verifyToken middleware');
  console.log(req.headers);
  const bearerHeader = req.headers['authorization'];
  // Check if the header exists
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    // Should be 2 parts
    if (bearer.length === 2) {
      const bearerToken = bearer[1];
      // Verify the token authenticity
      jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
        if (err) {
          console.log('verifyToken middleware jwt verification error');
          res.status(403).json({
            message: 'Forbidden',
            error: err,
          });
          return;
        } else {
          console.log('verifyToken middleware success');
          req.authData = authData;
          return next();
        }
      });
      // There was no token in the authorization header
    } else {
      console.log('verifyToken middleware error no bearer token');
      res.status(403).json({
        message: 'Forbidden',
        error: 'No bearer token',
      });
    }
    return;
  }
  // There was no authorization header
  console.log('verifyToken middleware error no bearer header');
  res.status(403).json({
    message: 'Forbidden',
    error: 'No bearer header',
  });
}

module.exports = verifyToken;
