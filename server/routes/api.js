const router = require('express').Router();
const importRouter = require('./import/import');
const semesterRouter = require('./semester');


/**
 * Importing of data for Semester, Students and others
 */
router.use('/import', importRouter)


/**
 * CRUD and other routes for Semester
 */
router.use('/semester', semesterRouter)

module.exports = router