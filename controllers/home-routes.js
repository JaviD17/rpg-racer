const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { User } = require('../models');

router.get('/', (req, res) => {
  res.render('index');
});

//login route
router.get('/login', (req, res) => {
  res.render('login');
})

module.exports = router;