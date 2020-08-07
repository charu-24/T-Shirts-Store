const User = require("../models/user");
const { check, validationResult, clearCookie } = require("express-validator");
var jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const { email } = req.body

  User.findOne({email}, (err, user) => {
    if(user==null){
      const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log("i am also here")
      return res.status(400).json({
        err: "NOT able to save user in DB"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
    }
    else{
      console.log("i am here", user)
      return res.status(400).json({
        error:"user already exist"
      })
    }
  })

  
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, encry_password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(400).json({
        error: "USER email does not exists"
      });
    }

    if (user.authenticate(encry_password)) {
      console.log(encry_password)
      return res.status(401).json({
        error: "Email and password do not match"
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token")
  res.json({
    message: "User signout"
  });
};

//protected route
exports.isSignedIn  = expressJwt({

  secret: process.env.SECRET,
  userProperty:"auth",
  algorithms: ['HS256'] 
  
});

exports.isAuthenticated = (req, res, next) => {
  console.log("i am in authenticate")
  let checker = req.profile && req.auth && req.profile._id == req.auth._id
  
  if(!checker){
    return res.status(403).json({
      error: "ACCESS DENIED"
    })
  }

  next()
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0){
    res.status(403).json({
      error: "You are not ADMIN"
    })
  }

  next()
}