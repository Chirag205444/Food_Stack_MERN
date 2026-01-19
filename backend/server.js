const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors')
const mongooseConnection=require('./config/mongooseConection');
const recipeRoutes=require('./routes/recipeRoute');
const userRoutes=require('./routes/userRoute');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))

PORT=process.env.PORT || 3000;

//app.use("/",userRoutes)
app.use("/recipe",recipeRoutes);
app.use("/",userRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
