const { Schema, model } = require('mongoose');
const { Semester, Student }  = require('./modelNames');

const SemesterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: Student,
    }]
}, {
    timestamps: true
})

module.exports = model(Semester, SemesterSchema);