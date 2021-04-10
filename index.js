const express = require('express')
const app = express()

app.use('/recipesbyingredients', require('./routes/recipesbyingredients.js')) 

app.use('/recipedetails', require('./routes/recipedetails.js'))

// app.use('/ingredients', require('./routes/ingredients.js'))
  
// app.use('/conversions', require('./routes/conversions.js'))


const dotenv = require('dotenv');
dotenv.config();
console.log(`Your port is ${process.env.PORT}`); // 8626

app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
}); 