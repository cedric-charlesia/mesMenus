require('dotenv').config();
const cors = require('cors')

const express = require('express');
const app = express();

require('./config/database');
const router = require('./app/router');

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`App is listenning on port http://localhost:${port}`)
})