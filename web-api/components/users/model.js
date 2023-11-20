const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email:{type:String, required:true, unique:true},
    name:{type:String, required:true},
    password:{type:String, required:true},
    // phone:{type:String, required:true},
    role:{type:Number, required:true},
    // age:{type:Number, required:true},
    // gender:{type:String, required:true},leve
    level:{type:Number, required:false}

})

module.exports = mongoose.model('User', userSchema) || mongoose.models.User;