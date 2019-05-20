const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets.js')

// quickly see what this file exports
module.exports = {
  authenticate,
  makejwt,
  checkauth
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'The token provided is not valid' });
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

function makejwt(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, jwtSecret, options);
};


function checkauth(req, res) {
  const token = req.body.token;
  jwt.verify(token, jwtSecret, err => {
    if (err) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
}