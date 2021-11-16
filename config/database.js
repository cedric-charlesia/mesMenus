const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose
.connect(process.env.DB_CONNECT, options)
.then(() => console.log('Connected to MongoBD database'))
.catch((error) => {console.error('MongoBD connection error:', error.message)});