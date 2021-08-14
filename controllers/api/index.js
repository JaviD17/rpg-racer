const router = require('express').Router();

const userRoutes = require('./user-routes');
const favoritesRoutes = require('./favorites-routes');
const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes);
router.use('/favorites', favoritesRoutes)
router.use('/comments', commentRoutes)


module.exports = router;