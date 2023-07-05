const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

//id is provided by default so we are not providing it explicitly
const answerSchema = new Schema({
    author:{type: Schema.Types.ObjectId, ref: "User", required: true },
    content:{type: String,required:true},
    dateOfPosting:{type:Date, default:Date.now},
    likes:Number
})

const Answer = mongoose.model("Answer",answerSchema);
module.exports = Answer ;