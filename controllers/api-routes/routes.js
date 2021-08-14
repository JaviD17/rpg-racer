const router = require('express').Router();
const { Op } = require('sequelize');

router.get('/', (req, res) => {
    res.render('index'); 
    
});

router.get('/login', (req, res) => {
  res.render('login');
})

module.exports = router;