const mongoose = require('mongoose')
const {Schema} = mongoose;
const ObjectID = Schema.ObjectId;

const productSchema = new Schema({
    name:{type:String, required:true, unique:true},
    price:{type:Number, required:true,},
    quantity:{type:Number, required:true},
    detail:{type:String, required:true,},
    image:{type:String, required:true},
    category_id:{type:ObjectID, required:true, ref:'Category'},
});

module.exports = mongoose.model('Product', productSchema) || mongoose.models.Product;