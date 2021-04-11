const express = require('express')
const app = express()

const dotenv = require('dotenv');
dotenv.config();

app.use('/recipesbyingredients', require('./routes/recipesbyingredients.js')) 

app.use('/recipedetails', require('./routes/recipedetails.js'))

app.use('/random', require('./routes/randomrecipes.js'))

app.use(cors())
  
// app.use('/conversions', require('./routes/conversions.js'))

console.log(`Your port is ${process.env.PORT}`); // 8626
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
}); 

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})