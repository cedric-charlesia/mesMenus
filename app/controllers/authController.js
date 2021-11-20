const Users = require('../models/users');

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
    res.json(newUser);
  }
  catch(error) {
    console.error('Error:', error.message);
    res.status(400).json({"Error": error.message});
  }
};

exports.signIn = async (req, res) => {

  const userEmail = req.body.email;
  const userPassword = req.body.password;
  
  try {
    const user = await Users.findOne({email: userEmail});

    if (!user) {
      res.json({'Error': `L'email '${userEmail}' n'est pas valide`})
    }

    if (user) {
      const hash = user.password;

      const validPassword = bcrypt.compareSync(userPassword, hash);

      if (validPassword) {
        const token = createToken(user._id);
        res.cookie('jwtToken', token, { httpOnly: true, maxAge});
        res.status(201).json(
          {
            id: user._id,
            user: user.pseudo
          }
        );
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({"Error": error.message});
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