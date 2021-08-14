const router = require('express').Router();
const homeRoutes = require('./api/home-routes.js');
const apiRoutes = require('./api');
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');
const Favorite = require('../models/Favorites')

router.use('/api', apiRoutes);
router.use('/api', homeRoutes);

router.use('/api', apiRoutes);

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Favorite, {
    foreignKey: 'user_id'
})

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;