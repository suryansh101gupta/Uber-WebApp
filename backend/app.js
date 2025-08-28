const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDB = require('./db/db');
const userRouter = require('./routes/user_routes');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/users', userRouter);

module.exports = app;