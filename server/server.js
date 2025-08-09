require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const connectToDatabase = require('./db');
const authRoutes = require('./router/authRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectToDatabase();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
