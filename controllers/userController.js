const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const signup = asyncHandler(async (req,res,next)=>{
    const data = req.body ;
    // Here we are using bcrypt to hash our password before storing it in the database
    const encryptedPassword = bcrypt.hashSync(data.password,8);
    data.password = encryptedPassword ;
    const user = new User(data);
    await user.save();
    res.status(200);
    res.send({message:"User Registered successfully"})
})

const signin = asyncHandler(async(req,res,next)=>{
    const data = req.body ;
    const user = await User.findOne({email:data.email}).exec();
    //when no match is found findOne returns null while find returns []
    if(!user){
        res.status(404);
        res.send({message:"User Not found."})
        return ;
    }
    //comparing passwords
    const passwordIsValid = bcrypt.compareSync(data.password,user.password);
    // checking if password was valid and send response accordingly
    if(!passwordIsValid){
        res.status(401);
        res.send({accessToken:null, message:"Invalid Password!"});
        return ;
    }
    //signing token with user id
    const token = jwt.sign({
        id: user._id
        }, 
        process.env.API_SECRET, 
        {
            expiresIn: 86400
        }
    );
    
    res.status(200);
    res.send({
        user:{
            id:user._id,
            email:user.email,
            name:user.name
        },
        message:"Login successfull",
        accessToken:token
    });
})

module.exports = {signup , signin};
