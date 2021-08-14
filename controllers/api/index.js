const router = require('express').Router();

const userRoutes = require('./user-routes');
const favoritesRoutes = require('./favorites-routes');

router.use('/users', userRoutes);
router.use('/favorites', favoritesRoutes)



module.exports = router;