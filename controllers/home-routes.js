const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { User } = require('../models');

router.get('/', (req, res) => {
  //console.log(req.session);
  res.render('index');
});

//login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;