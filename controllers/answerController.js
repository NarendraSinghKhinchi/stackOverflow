const asyncHandler = require("express-async-handler");
const Answer = require('../models/answer');

const answer_get = asyncHandler(async(req,res,next)=>{
    const data = req.query.arrayData.split(',');
    const answers = await Answer.find({_id : {$in : data}});
    res.send(answers);
})


module.exports = {answer_get}; ;