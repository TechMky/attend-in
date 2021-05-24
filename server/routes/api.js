const router = require('express').Router();
const importRouter = require('./import/import');
const semesterRouter = require('./semester');
const attendanceRouter = require('./attendance');


/**
 * Importing of data for Semester, Students and others
 */
router.use('/import', importRouter)


/**
 * CRUD and other routes for Semester
 */
router.use('/semester', semesterRouter)

/**
 * Normal Crud related for attendance
 */
router.use('/attendance', attendanceRouter)

module.exports = router