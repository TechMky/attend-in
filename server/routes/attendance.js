const { StatusCodes } = require('http-status-codes');
const Attendance = require('../models/Attendance');
const { destructureDate } = require('../utils');

const router = require('express').Router();


router.post('/submit', async (req, res) => {
    try {
        
        if (Array.isArray(req.body.attendance) === true) {

            const {year, month, day } = destructureDate(req.body.attendanceDate)
            
            const removeResult = await Attendance.deleteMany({date: {year, month, day}, semester: req.body.attendance[0].semester._id})

            console.log("Removing duplicate Attendance",removeResult.deletedCount)

            const attendance = req.body.attendance.map(attend => {
                const {year, month, day } = destructureDate(attend.date)
                attend.date = {year, month, day}
                return attend
            })

            const insertResult = await Attendance.insertMany(attendance)

            return res.json(insertResult)
        }

        throw new Error('JSON payload is invalid')

    } catch (error) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({error: error.name, message: error.message})
    }
})


router.get('/generateExcel/:semesterId', async (req, res) => {
    try {
        
        //for single dates
        if (req.query.date) {
            const {year, month, day} = destructureDate(req.query.date)

            const attendanceList = await Attendance.find({date: {year, month, day}, semester: req.params.semesterId})
            
            //need to generate excel file here and send back

            return res.json(attendanceList)
        }




    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

router.get('/', async (req, res) => {
    try {

        const attendance = await Attendance.find({})
        res.json(attendance)
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

router.delete('/', async (req, res) => {
    try {
        
        const result = await Attendance.deleteMany({})

        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

module.exports = router