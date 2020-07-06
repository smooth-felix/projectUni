const mongoose = require('mongoose');

const CropSchema = mongoose.Schema({

_id:{
    type: mongoose.Schema.Types.ObjectId
},
farmerID : {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required: true
},
landSize :{
    type: Number,
    required : true
},
cultivationDate : {
    type : Date,
    required : true,
    default : Date.now()
},
location : {
    type: String,
    required : true
}
});

const Crop = module.exports = mongoose.Schema('Crop' , CropSchema);