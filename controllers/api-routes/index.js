const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const Routes = require('./routes.js');

router.use('/users', userRoutes);
router.use('/', Routes);

module.exports = router;