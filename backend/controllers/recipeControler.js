const recipeModel=require('../models/recipeModel');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.fieldname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })



const getrecipes=async(req,res)=>{
    try{
      let allRecipes=await recipeModel.find();
    if(allRecipes.length==0){
         return res.status(200).json({ message: 'No recipes found' });
    }
    res.json(allRecipes);
    }catch(err){ 
    res.status(500).json({ error: 'Server error, please try again later' });
    }
}

const getrecipe=async(req,res)=>{
    try{
      const oneRecipe=req.params.id;
    recipe=await recipeModel.findById(oneRecipe);
    if(!oneRecipe){
        return res.json({message : "No recipe id found"})
    }
    res.send({
        recipe: {title:recipe.title,ingredients:recipe.ingredients,instructions:recipe.instructions,time:recipe.time}
    })
    }catch(err){
        return res.error({message : "No recipe id found"})
    }
}

const addrecipe=async(req,res)=>{
    
       try{
        let {title,ingredients,instructions,time}=req.body;
        if(!title || !ingredients || !instructions){
         return res.json({message:'All fields are required'}).status(400);
      }
     const recipeExists=await recipeModel.findOne({ingredients:ingredients});
     if(recipeExists){
        return res.json({message:'same recipie already exists'})
     }
    const newrecipe=await recipeModel.create({
        title,
        ingredients,
        instructions,
        time,
        coverImage : req.file.filename,
        createdby:req.user.id    
     })
     return res.json({message:'recipe added successfully',recipe:newrecipe});}
   catch(err)
     {   res.status(500).json({ error: 'Server error, please try again later' });   }

}

const updaterecipe=async(req,res)=>{
    try{
       // let {title,ingredients,instructions,time,coverImage}=req.body;
    const recipe=await recipeModel.findById(req.params.id);
    if(!recipe){
        return res.json({message:'recipe not found'});
    }
    const updateRecipe=await recipeModel.findOneAndUpdate({_id:req.params.id},{
        ...req.body,coverImage : req.file.filename,},{new:true});
        res.json({message:'recipe updated successfully',recipe:updateRecipe});
    }
    catch(err){
        res.json({message:'error in updating recipe',error:err.message})
    }
}

const deleterecipe=async(req,res)=>{
    try{
        const recipe=await recipeModel.findById(req.params.id);
        if(!recipe){
            return res.json({message:'recipe not found'});
        }
        await recipeModel.findOneAndDelete({_id:req.params.id});
        res.json({message:'recipe deleted successfully'});
    }
    catch(err){
        res.json({message:'error in deleting recipe',error:err.message})
    }
}



module.exports={getrecipes,getrecipe,addrecipe,updaterecipe,deleterecipe,upload};