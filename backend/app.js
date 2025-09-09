const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectToDB = require('./db/db');
const userRouter = require('./routes/user_routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain_routes');
const mapsRoutes = require('./routes/maps_routes')
const rideRoutes = require('./routes/ride_routes')

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);

app.use('/captain', captainRoutes);

app.use('/maps', mapsRoutes);

app.use('/rides', rideRoutes);

module.exports = app;