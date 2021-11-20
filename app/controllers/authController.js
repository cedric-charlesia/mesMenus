const Users = require('../models/users');
const { signUpErrors } = require('../../utils/errorsHandler');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Create a new token for the user
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

exports.signUp = async (req, res) => {
  
  try {
    const saltRound = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRound);

    const newUser = await Users.create({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash
    });
    res.status(200).json(newUser);
  }
  catch(error) {
    // console.error('Error:', error.message);
    const errors = signUpErrors(error);
    res.status(200).send({ errors });
  }
};

exports.signIn = async (req, res) => {

  const userEmail = req.body.email;
  const userPassword = req.body.password;
  
  try {
    const user = await Users.findOne({email: userEmail});

    if (!user) {
      res.status(200).json({'Error': `Email '${userEmail}' inconnu`})
    }

    if (user) {
      const hash = user.password;

      const validPassword = bcrypt.compareSync(userPassword, hash);

      if (!validPassword) {
        res.status(200).json({'Error': `Le mot de passe ne correspond pas`})
      }

      if (validPassword) {
        const token = createToken(user._id);
        res.cookie('jwtToken', token, { httpOnly: true, maxAge});
        res.status(200).json(
          {
            id: user._id,
            user: user.pseudo
          }
        );
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    // const errors = signInErrors(error);
    // res.status(200).send({ errors });
  }
};

exports.logOut = async (req, res) => {
  try {
    res.cookie('jwtToken', '', {maxAge: 1});
    res.redirect('/');
  }
  catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({"Error": error.message});
  }
}