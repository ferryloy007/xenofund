const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Simple validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    let newUser = await User.findOne({ email });
    if (newUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    newUser = new User({
      fullName,
      email,
      password,
    });

    // Create salt & hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save newUser to database
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (e) {
    console.error('Failed to register', e);
    res.status(500).json({ error: 'Server error' });
  }
};

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Simple validation
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Please enter all fields' });
//     }

//     // Check for user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: 'user not found' });
//     }

//     // Validate password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     console.log('User logged in successfully');
//   } catch (err) {
//     console.error('Error', err.message);
//     res.status(400).json({ error: 'Error logging in' });
//   }
// };

const loginUser = async (req, res) => {
  try {
    console.log('Incoming body:', req.body); // debug line

    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.fullName },
      process.env.JWT_SECRET || 'yoursecretkey',
      { expiresIn: '1h' }
    );

    // Send token + user info
    return res.status(200).json({
      msg: 'User logged in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.fullName,
      },
    });
  } catch (err) {
    console.error('Error', err.message);
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
