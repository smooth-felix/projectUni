const mongoose = require('mongoose');

const VegetableSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    imageSrc :{
        type: String,
        required : true
    },
    nameEnglish : {
        type: String,
        required : true
    },
    nameSinhala : {
        type: String,
        required : true
    },
    nameTamil : {
        type: String,
        required : true
    },
    harvestTime : {
        type : Number,
        required : true
    }

})
module.exports = mongoose.model('Vegetable', VegetableSchema);