const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const mongooseConnection = require('./config/mongooseConection');
const recipeRoutes = require('./routes/recipeRoute');
const userRoutes = require('./routes/userRoute');

// ✅ CORS (temporary for now)
app.use(cors({
  origin: "food-stack-mern-alpha.vercel.app"
}));

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ✅ Routes
app.use("/recipe", recipeRoutes);
app.use("/", userRoutes);

// ✅ PORT (IMPORTANT: use const)
const PORT = process.env.PORT || 3000;

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});