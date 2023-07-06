const express = require('express') ;
require('dotenv').config() ;
const bodyParser = require('body-parser');
// dotenv is npm module 
const cors = require('cors');
const mongoose = require("mongoose") ;


const indexRouter = require('./routes/index');
const userRouter = require("./routes/userRoute");

const port = process.env.PORT || 4000 ;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const mongoDB = `mongodb+srv://NarendraSinghKhinchi:${process.env.MONGO_KEY}@cluster0.vgb35ac.mongodb.net/?retryWrites=true&w=majority` ;
async function main(){
    try{
        await mongoose.connect(mongoDB);
        console.log("connection to database successful");
    }catch(err){
        console.log("error occured while connecting to monogodb" ,err);
    }
}
main();

const corsOptions = {
    origin:['http://localhost:3000' , 'https://stackoverflowclone-xr0h.onrender.com']
}
app.use(cors(corsOptions));
app.use("/",indexRouter);
//using user route
app.use("/user",userRouter);

app.listen(port, ()=>{
    console.log("server is running on port ", port);
})

//error handler
app.use(function(err,req,res,next){
    console.log(err);
    //return the error message
    res.status(err.status || 500);
    res.send({message : "error occured on the server side please check your credentials" ,
        error:err
    });
})
module.exports = app ;