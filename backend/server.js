require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
// app.use(cors({
//   origin: [
//     'https://car-management-app-kappa.vercel.app',
//     'http://localhost:3000' // for local development
//   ],
//   credentials: false,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
// }));
app.use(express.json());


// Routes will be added here later
app.get('/', (req, res) => {
  res.json({ message: 'Car Management API is running' });
});
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working' });
});
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;