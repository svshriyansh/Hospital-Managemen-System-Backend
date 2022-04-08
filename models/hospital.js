const mongoose = require("mongoose")

const HospitalSchema = new mongoose.Schema({
        hospitalName : {
            type : String,
            require : true
        },
        address:{
            type: String,
            require: true
        },
        sector:{
            type: String,
            require: true
        },
        category:{
            type: String,
            require: true
        }
})

module.exports = mongoose.model('Hospital',HospitalSchema)