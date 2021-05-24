const { StatusCodes } = require('http-status-codes');
const Semester = require('../models/Semester');

const router = require('express').Router();


/**
 * GET all Semester from the database. For all active & inactive database, pass a query param `all`
 */
router.get('/', async (req, res) => {
    
    try {

        if (Boolean(req.query.all) === true) {
            
            const semesters = await Semester.find({}).populate('students')
            return res.json(semesters)

        }

        const semesters = await Semester.find({isActive: true}).populate('students')
        return res.json(semesters)

        
    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: error.name, message: error.message})
    }

});


module.exports = router