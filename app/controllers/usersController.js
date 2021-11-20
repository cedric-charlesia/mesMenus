const Users = require('../models/users');

const bcrypt = require('bcrypt');

exports.showAll = async (req, res) => {
  
  try {
    const users = await Users.find().select('-password');
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
    res.json({'Error': `L'id '${userId}' n'est pas valide`});

    const user = await Users.findById(userId).select('-password');

    if(!user) {
      res.json({'Error': `L'id '${userId}' n'existe pas`});
    } else {
      res.json(user);
    }
  }
  catch(error) {
    console.error('Error:', error.message);
  }
};

exports.update = async (req, res) => {

  const userId = req.params.id;
  const userPseudo = req.body.pseudo;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    if (!userId.match(/^[0-9a-fA-F]{24}$/))
      res.json(`L'id ${userId} n'est pas valide.`);
    
    if (!userEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
    res.json({'Error': `L'email '${userEmail}' n'est pas valide`});

    const saltRound = 10;
    const hash = bcrypt.hashSync(userPassword, saltRound);

      const updatedUser = await Users.findByIdAndUpdate(userId, {
        pseudo: userPseudo,
        email: userEmail,
        password: hash
      }, {
        new: true
      }).select('-password');
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
    res.json({'Error': `L'id '${userId}' n'est pas valide`});

      const removedUser = await Users.findByIdAndRemove(userId);
    // console.log(`L'utilisateur a bien été supprimé`);
    res.send(`L'utilisateur ${userId} a bien été supprimé`);
  }
  catch(error) {
    console.error('Error:', error.message);
  }
}