const mongoose = require("mongoose");

const Schema = mongoose.Schema ;

//id is provide by default so we are not providing it explicitly
const QuestionSchema = new Schema({
    title:{type:String, required:true},
    author:{type: Schema.Types.ObjectId, ref: "User", required: true },
    description:{type:String, required:true},
    tags:{type:Array},
    // Arrays are special because they implicitly have a default value of [] (empty array).
    answers:{type:Array},
    votes:Number,
    views:Number,
});

//to use our schema definition, we need to convert our "QuestionSchema" into a "Model"
// we can work with.

const Question = mongoose.model('Question', QuestionSchema );

// now we need to export it so that we can use it to create instances
module.exports = Question ;
