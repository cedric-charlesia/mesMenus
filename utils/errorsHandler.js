exports.signUpErrors = (error) => {
  let errors = {
    pseudo: '',
    email: '',
    password: ''
  };
  if (error.message.includes('pseudo')) {
    errors.pseudo = 'Pseudo incorrect ou déjà pris';
  }
  if (error.message.includes('email')) {
    errors.email = 'Email incorrect ou déjà pris';
  }
  if (error.message.includes('password')) {
    errors.password = 'Le mot de passe doit faire 8 caractères minimum';
  }
  if (error.code === 11000 && Object.keys(error.keyValue)[0].includes('pseudo')) {
    error.pseudo = 'Ce pseudo est déjà enregistré';
  }
  if (error.code === 11000 && Object.keys(error.keyValue)[0].includes('email')) {
    error.email = 'Cet adresse email est déjà enregistré';
  }
  return errors;
};

// exports.signInErrors = (error) => {
//   let errors = {
//     email: '',
//     password: ''
//   };
//   if (error.message.includes('email')) {
//     errors.email = 'Email inconnu';
//   }
//   if (error.message.includes('password')) {
//     errors.password = 'Le mot de passe ne correspond pas';
//   }
//   return errors;
// }