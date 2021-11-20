const Users = require('../models/users');

const bcrypt = require('bcrypt');

exports.showAll = async (req, res) => {
  
  try {
    const users = await Users.find();
    res.json(users);
  }
  catch(error) {
    console.error('Error:', error.message);
  }
};

exports.showOne = async (req, res) => {

  const userId = req.params.id;
  
  try {
    if (!userId.match(/^[0-9a-fA-F]{24}$/))
      res.json(`L'id ${userId} n'est pas valide.`);

    const user = await Users.findById(userId);

    if(!user) {
      res.json(`L'id ${userId} n'existe pas.`);
    } else {
      res.json(user);
    }
  }
  catch(error) {
    console.error('Error:', error.message);
  }
};

exports.add = async (req, res) => {
  
  try {
    const saltRound = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRound);
    
    // console.log(req.body);

    const newUser = await Users.create({
      pseudo: req.body.pseudo,
      email: req.body.email,
      password: hash
    });
    // console.log(newUser);
    res.json(newUser);
  }
  catch(error) {
    console.error('Error:', error.message);
    res.status(400).json({"Error": error.message});
  }
};

exports.update = async (req, res) => {

  const userId = req.params.id;

  try {
    if (!userId.match(/^[0-9a-fA-F]{24}$/))
      res.json(`L'id ${userId} n'est pas valide.`);

    const saltRound = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRound);

      const updatedUser = await Users.findByIdAndUpdate(userId, {
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      }, {
        new: true
      });
    // console.log(updatedUser);
    res.json(updatedUser);
  }
  catch(error) {
    console.error('Error:', error.message);
  }
};

exports.delete = async (req, res) => {

  const userId = req.params.id;

  try {
    if (!userId.match(/^[0-9a-fA-F]{24}$/))
      res.json(`L'id ${userId} n'est pas valide.`);
      
      const removedUser = await Users.findByIdAndRemove(userId);
    // console.log(`L'utilisateur a bien été supprimé`);
    res.send(`L'utilisateur ${userId} a bien été supprimé`);
  }
  catch(error) {
    console.error('Error:', error.message);
  }
}