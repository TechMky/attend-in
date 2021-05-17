const { Schema, model } = require('mongoose');
const { Semester, Student, Attendance }  = require('./modelNames');

const AttendanceSchema = new Schema({
    semester: {
        type: Schema.Types.ObjectId,
        ref: Semester,
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: Student,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    statusText: {
        type: String,
        required: true
    },
    date: {
        year: Number,
        month: Number,
        day: Number,
    }
}, {
    timestamps: true
})

module.exports = model(Attendance, AttendanceSchema);