const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const Semester = require('../../models/Semester');
const Student = require('../../models/Student');

/**
 * Imports and array of semester into the database
 */
router.post('/', async (req, res) => {

    try {
        
        if (Array.isArray(req.body) === false) throw new Error('JSON Payload is not an array')

        const semestersPromises = req.body.map(async sem => {

            if (Array.isArray(sem.students) === true) {
                sem.students = await Student.insertMany(sem.students)
            } else {
                sem.students = []
            }

            return sem

        })

        const semesters = await Promise.all(semestersPromises)
        const result = await Semester.insertMany(semesters)

        res.status(StatusCodes.CREATED).json(result);

    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: error.name, message: error.message})
    }

})


/**
 * Deletes all the semester from database
 */
router.delete('/', async (req, res) => {
    try {
        
        const result = await Semester.deleteMany({})

        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
});

module.exports = router