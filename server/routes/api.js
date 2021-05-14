const router = require('express').Router();
const importRouter = require('./import');

router.use('/import', importRouter)

module.exports = router