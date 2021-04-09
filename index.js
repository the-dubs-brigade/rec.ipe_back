const express = require('express')
const app = express()

app.use('/recipes', require('./routes/recipes.js')) 

// app.use('/ingredients', require('./routes/ingredients.js'))
  
// app.use('/conversions', require('./routes/conversions.js'))

app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
});