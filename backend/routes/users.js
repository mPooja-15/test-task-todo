const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

// load user model
require('../models/User');
const User = mongoose.model('users');

// login form post
router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ user }, "secret", {
      expiresIn: "7d",
    });
    res.json({
      message: "login successfully",
      token: token,
      data: user
    })
  }
});

// register form post
router.post('/register', (req, res) => {
  let errors = [];
  if (req.body.password.length < 4) {
    res.json({ text: 'Password must be at least 4 characters' });
  }
  if (errors.length > 0) {
    res.json('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
  } else {
    User.findOne({
      email: req.body.email
    }).then((user) => {
      if (user) {
        res.status(400).json({
          message: "A user with the same email already exists",
          data: user
        });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
              res.json(user);
            }).catch(err => {
              console.log(err);
              return;
            });
          });
        });
      }
    });
  }
})

module.exports = router;