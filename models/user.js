const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

//id is provide by default so we are not providing it explicitly
const userSchema = new Schema({
    name:{type:String, required:true},
    interests:{type:Array},
    email:{
        type:String, 
        required:[true,"email not provided"],
        trim:true,
        lowercase:true,
        unique:[true, "email already exists in database!"]
    },
    password:{type:String,required:true}
})

const User = mongoose.model("User",userSchema);

module.exports = User ;

