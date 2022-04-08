const mongoose = require('mongoose')
const starWar = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    quote:{
        type: String,
        required: true
    }
})

module.exports = starWarModel = mongoose.model('star-wars', starWar)