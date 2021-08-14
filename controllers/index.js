const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const User = require('../models/User.js');
const Post = require('../models/Post.js');

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = router;