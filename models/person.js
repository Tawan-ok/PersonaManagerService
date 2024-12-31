const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    firstName : {type:String, require:true},
    lastName : {type:String, require:true},
    birthDate : {type:Date, require:true},
    age : {type:Number, require:true},
    gender : {type:String, enum:['Male', 'Female', 'Other'], require:true}
});

module.exports = mongoose.model('Person', personSchema);