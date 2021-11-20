require('dotenv').config();
require('./config/database');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { trackUser, requireAuth } = require('./middleware/authMiddleware');

const port = process.env.PORT || 5000;
const app = express();
const router = require('./app/router');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('*', trackUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).json({
    'ID': `${res.locals.user._id}`,
    'Username': `${res.locals.user.pseudo}`,
  });
})

app.use(router);

app.listen(port, () => {
  console.log(`App is listenning on port http://localhost:${port}`)
})