const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');
const Favorite = require('../models/Favorites')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;