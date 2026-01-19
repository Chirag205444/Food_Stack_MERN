const express=require('express');
const router=express.Router();
const {getrecipes,getrecipe,addrecipe,deleterecipe,updaterecipe,upload}=require('../controllers/recipeControler');
const verifyToken = require('../middleware/auth');

router.get('/',getrecipes);   //get all recipes
router.get('/:id',getrecipe);   //get recipe by id
router.post("/",upload.single('file'),verifyToken,addrecipe);  //add new recipe
router.delete("/:id",deleterecipe);  //delete recipe by id
router.put("/:id",upload.single('file'),updaterecipe);   //update recipe by id

module.exports=router;