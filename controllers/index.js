const router = require('express').Router();

const homeRoutes = require('./api-routes/routes.js');

router.use('/', homeRoutes);

module.exports = router;