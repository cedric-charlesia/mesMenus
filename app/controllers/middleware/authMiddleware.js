const jwt = require('jsonwebtoken');
const Users = require('../../models/users');

exports.trackUser = (req, res, next) => {
  const token = req.cookies.jwtToken;

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (error, validToken) => {
        if (error) {
          res.locals.user = null;
          res.cookie('jwtToken', '', {maxAge: 1});
          next();
        } else {
          // console.log('Token:', validToken);
          const user = await Users.findById(validToken.id).select('-password');
          res.locals.user = user;
          // console.log('User:', res.locals.user);
          next();
        }
      });
    }
    else {
      res.locals.user = null;
      next();
    }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwtToken;

    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (error, validToken) => {
        if (error) {
          res.status(400).json({'Error': `Authentification impossible`});
        } else {
          next();
        }
      })
    } else {
      res.json({'Error': `No token for authentification`});
    }
}