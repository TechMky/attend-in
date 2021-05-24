const { Schema, model } = require('mongoose');
const { Student }  = require('./modelNames');

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model(Student, StudentSchema);