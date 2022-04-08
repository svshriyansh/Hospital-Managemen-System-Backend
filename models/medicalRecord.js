const mongoose = require("mongoose")

const recordSchema = new mongoose.Schema({
    examinDate: {
        type: Date,
        require: true
    },
    problem:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('MedicalRecord',recordSchema)