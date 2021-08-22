const router = require("express").Router();
const { Op } = require("sequelize");
const sequelize = require("../config/connection");
const { User } = require("../models");

router.get("/", (req, res) => {
  //console.log(req.session);
  res.render("index", {
    loggedIn: req.session.loggedIn,
  });
});

//login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//signup route
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/search-results/:city", (req, res) => {
  res.render("search-results");
});

router.get("/pub/:id", (req, res) => {
  res.render("pub");
});

module.exports = router;
