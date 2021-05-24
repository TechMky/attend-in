const router = require('express').Router();
const studentImportRouter = require('./student')
const semesterImportRouter = require('./semester')


router.use('/student', studentImportRouter);

router.use('/semester', semesterImportRouter);

module.exports = router