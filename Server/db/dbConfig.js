const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://sasindusathiska:sasindu16941@cluster0.e4ojf.mongodb.net/MediConnect';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
