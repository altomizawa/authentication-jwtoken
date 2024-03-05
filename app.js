require('dotenv').config();
require('./config/database').connect();
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

//importing user Context
const User = require('./model/user');
const Item = require('./model/user');

const app = express();

app.use(express.json());

//Create Welcome route
app.post('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome to the Authenticated Area');
});

//Register
app.post('/register', async (req, res) => {
  //Register logic starts here
  try {
    // Get user input
    const { firstName, lastName, email, password, pastOrders } = req.body;

    //Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send('All inputs are required');
    }

    //Check if user already exists
    //Validate if user exists in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User already exists. Please login');
    }

    // Encrypt password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(), //sanitize
      password: encryptedUserPassword,
      pastOrders: pastOrders,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '5h',
      }
    );

    //save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

//Login
app.post('/login', async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All inputs are required');
    }
    // Validate if user exists in database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '5h',
        }
      );
      // save user token
      user.token = token;

      // return user
      return res.status(200).json(user);
    }
    return res.status(400).send('Invalid credentials');
  } catch (err) {
    console.log(err);
  }
});

// Get Users
app.get('/users', async (req, res) => {
  try {
    //Get all users
    const users = await User.find();

    // Send all Users
    if (!users) {
      return res.status(400).send('No Users in Database');
    }

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

// Get User by Id
app.get('/users/:id', async (req, res) => {
  try {
    //Find User By Id
    console.log(req.params.id);
    const user = await User.findById(req.params.id);

    //Check if there's a user with that Id
    if (!user) {
      return res.status(400).send('User not in Database');
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Delete User by Id
app.delete('/users/', async (req, res) => {
  try {
    // Get User id from body
    const { _id } = req.body;

    //Find User By Id and Delete
    //Find if e-mail exists in Database
    const user = await User.findByIdAndDelete({ _id: _id });
    if (!user) {
      return res.status(400).send('No user found');
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
