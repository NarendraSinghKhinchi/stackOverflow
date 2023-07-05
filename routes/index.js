const express = require("express");
const router = express.Router();

const question_controller = require("../controllers/questionController");
const answer_controller = require("../controllers/answerController") ;
//by default the home root of out api returns latest 500 questions
router.get('/', question_controller.question_list);

// route to post a question when user submits a new question
router.post('/' ,question_controller.question_post);

// route to answer a question 
router.get('/:id/answer', answer_controller.answer_get );

// route to answer a question 
router.post('/:id/answer', question_controller.add_answer );

module.exports = router ;