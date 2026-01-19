const mongoose = require('mongoose');
const dbgr=require('debug')
// require('dotenv').config();

mongoose.connect(`${process.env.CONNECTION_URL}foodRecipe`)
.then(()=>{
    console.log("MongoDB connected successfully");
    dbgr("connected")
}).catch((err)=>{
   dbgr("not connected",err)
})

module.exports=mongoose.connection;