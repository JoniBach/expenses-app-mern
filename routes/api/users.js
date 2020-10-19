const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// const User = require("../../models/User")
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          sName: req.body.sName,
          dob: req.body.dob,
          mob: req.body.mob,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
// @route POST api/users/update
// @desc Update user
// @access Public
  router.post("/update", (req, res) => {
    var _id = req.body._id;
    var userInfo = {
          name: req.body.name,
          sName: req.body.sName,
          dob: req.body.dob,
          mob: req.body.mob,
          email: req.body.email,
    };
  
    User.findByIdAndUpdate(_id, userInfo, { new: true }, function(
      err,
      userInfo
    ) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("package retrieved, sending: ", userInfo);
        // Sign token
      
        // res.send(userInfo);
        userInfo
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
        
      }
    });
  });

  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            _id: user._id,
            name: user.name,
            sName: user.sName,
            email: user.email,
            dob: user.dob,
            mob: user.mob
          };
          console.log('payload: ', payload)

  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

 // @route POST api/users/upload
// @desc Update user
// @access Public
router.post("/upload", (req, res) => {
  // not getting id
  var _id = req.body._id;
  console.log('body: ',req.body)
  // console.log('user: ',_id)
  var userInfo = {
        // name: req.body.name,
        // sName: req.body.sName,
        // dob: req.body.dob,
        // mob: req.body.mob,
        // email: req.body.email,
        uploadData: [{
          processedText: req.body.processedText,
          storeName: req.body.storeName,
          totalAmount: req.body.totalAmount,
        }],
  };
  console.log('upload data: ',userInfo)

  User.findByIdAndUpdate(_id, userInfo, { new: true }, function(
    err,
    userInfo
  ) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      var userData = {
        // name: req.body.name,
        // sName: req.body.sName,
        // dob: req.body.dob,
        // mob: req.body.mob,
        // email: req.body.email,
        uploadData: [{
          processedText: req.body.processedText,
          storeName: req.body.storeName,
          totalAmount: req.body.totalAmount,
        }],
  };
      console.log("package retrieved, sending: ", userData);
      // Sign token
    
      // res.send(userInfo);
      userData
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
      
    }
  });
});

  module.exports = router;
