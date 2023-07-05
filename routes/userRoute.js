const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register" , userController.signup);

router.post("/login",userController.signin);



module.exports = router ;