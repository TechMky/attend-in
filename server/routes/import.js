const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const Student = require('../models/Student');

/**
 * Imports and array of students into the database
 */
router.post('/student', async (req, res) => {

    try {
        
        if (Array.isArray(req.body) === false) throw new Error('JSON Payload is not an array')

        const result = await Student.insertMany(req.body);

        res.status(StatusCodes.CREATED).json(result);

    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: error.name, message: error.message})
    }

})


/**
 * Deletes all the students from database
 */
router.delete('/student', async (req, res) => {
    try {
        
        const result = await Student.deleteMany({})

        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
});

module.exports = router