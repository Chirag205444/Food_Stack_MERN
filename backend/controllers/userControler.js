const userModel=require('../models/userModel');
const bcrypt=require('bcrypt');
const {generateToken} = require('../utils/generateToken');


// const userSignup=(req,res)=>{
//      let {email,password} = req.body; 
//      res.json({email : email ,password:password})
// }

const userSignup=async(req,res)=>{
     let {email,password} = req.body;
        try{
            if(!email || !password){
                return res.status(400).json({message:'All fields are required'});
            }
             const finduser=await userModel.findOne({email:email});

             if(finduser){
                return res.status(409).json({ message :"User already exist"})
            }
            bcrypt.genSalt(10,async(err,salt)=>{
                 bcrypt.hash(password,salt,async(err,hash)=>{
                      if(err){
                        return res.status(500).send(err);
                     }
                const newUser=await userModel.create({
                      email,
                      password : hash
                  })
                const token=generateToken(newUser);
                res.json({token , user:newUser})
             }) 
         })  
        }
        catch(err){
             res.status(500).send("issue in user signup method",err)
        }    
}

const userLogin=async(req,res)=>{
     let {email,password} = req.body;
        try{
             if(!email || !password){
                return res.status(400).json({message:'All fields are required'});
            }
             const user=await userModel.findOne({email:email});
            if(user && await bcrypt.compare(password,user.password)){
                 let token=generateToken(user);
                res.status(200).json({token:token,user:user})
            }
            else{
                res.status(500).json({message:"invalid password"})
            }
        }
        catch(err){
            res.status(500).send("issue in user user login method",err)
        }
}

const getUser=async(req,res)=>{
         let userId = req.params.id;
         try{
            const user=await userModel.findById({_id:userId})
            if(!user){
                res.status(400).json({message:"user doesnot exist"})
            }
            res.status(200).json({user:user});
         }catch(err){
             res.status(500).send("issue in user get user method",err)
         }
}

module.exports={userSignup,userLogin,getUser}