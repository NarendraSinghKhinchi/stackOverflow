const Question = require("../models/question");
const asyncHandler = require("express-async-handler");
const Answer = require('../models/answer');


const question_list = asyncHandler(async(req,res,next)=>{
    // console.log(req);
    const allQuestions = await Question.find();
    res.send({allQuestions, message:"fetch succesfull"});
})

const question_post = asyncHandler(async(req,res,next)=>{
    const data = req.body ;
    const question = new Question(data);
    const savedQuestion = await question.save();
    // console.log(savedQuestion);
    res.send(savedQuestion);
})

const add_answer = asyncHandler(async(req , res , next)=>{
    
    const questionId = req.params.id ;
    // let question = await Question.findById(questionId);
    // save the answer in the database
    const data = req.body ;
    // console.log(data);
    const answer = new Answer(data);
      
    const savedAnswer = await answer.save();
    // now add the id of savedAnswer in model of question in answers array
    // console.log(savedAnswer);
    // console.log(questionId , typeof(questionId));
    await Question.updateOne({ _id:questionId} , {$push: { answers: savedAnswer._id }});
    const question = await Question.findById(questionId);
    // console.log(question);
    res.send({question , message:"answer post succesfull" , savedAnswer});
})

module.exports = {question_list,question_post,add_answer}