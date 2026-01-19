const express=require('express');
const router=express.Router();
const {userSignup,userLogin,getUser}=require('../controllers/userControler')


router.post("/signup",userSignup);
router.post("/login",userLogin);
router.get("/user/:id",getUser);

module.exports=router