const express = require('express')
const app = express()

const dotenv = require('dotenv');
dotenv.config();

app.use('/recipesbyingredients', cors(), require('./routes/recipesbyingredients.js')) 

app.use('/recipedetails', cors(), require('./routes/recipedetails.js'))

app.use('/random', cors(), require('./routes/randomrecipes.js'))
  
// app.use('/conversions', require('./routes/conversions.js'))

console.log(`Your port is ${process.env.PORT}`); // 8626
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
}); 

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})