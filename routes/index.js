const express = require("express");
const Model = require("../models/index");
const router = express.Router();
const bcrypt = require("bcrypt");

const passport = require('passport');

const isAuthenticated = function (req, res, next) {
  console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }

router.get("/", function(req, res) {
  res.render("login", {messages: res.locals.getMessages()});
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res) {
  let username = req.body.username
  let password = req.body.password

  if (!username || !password) {
    req.flash('error', "Please, fill in all the fields.")
    res.redirect('signup')
  }

  let salt = bcrypt.genSaltSync(10)
  let hashedPassword = bcrypt.hashSync(password, salt)

  let newUser = {
    username: username,
    salt: salt,
    password: hashedPassword
  }

   Model.User.create(newUser)
  .then(function() {
    res.redirect('/')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different username.")
    res.redirect('/signup')
  });
});

router.get("/user", isAuthenticated, function(req, res) {
  res.render("index", {username: ''});
});

router.post("/message", function(req, res){
  let newMessage = Model.Message.create({
    userId: req.user.id,
    body: req.body.gabs,})
    .then(function(data){
      // console.log("WHEre are we", newMessage)
    res.redirect("/message")
  })
});

router.get('/message', function(req, res){
  Model.Message.findAll()
  .then(function(data){
    console.log("NEW MESSAGE", data);
    res.render("viewmessage",  {data: data})
  })
// console.log("Are we here??",data)
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
