const mongoose = require("mongoose")

const patientsSchema = new mongoose.Schema({
    patientName:{
        type: String,
        require: true
    },
    patientAge: {
        type: String,
        require : true
    },
    patientAddress : {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Patient',patientsSchema)