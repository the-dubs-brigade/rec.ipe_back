
const express = require('express')

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

var router = express.Router()

/**
 * @api {get} /recipedetails
 * @apiName GetRecipedetails
 * @apiGroup Recipes
 * 
 * @apiParam {String} id (Required)	The id of the recipe.
 * @apiParam {String} includeNutrition (Optional) Include nutrition data in the recipe information. 
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiDescription This end point is for getting the details of a specific recipe by id.
 */ 
router.get("/", (req, res) => {
    req.id = req.query.id;

    if(req.id){

        let myUrl = 'https://api.spoonacular.com/recipes/' + req.id + '/information?apiKey=' 
            + process.env.SPOONACULAR_API_KEY 
        console.log(myUrl)
        
        fetch(myUrl)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                res.send(json)
            })
            .catch(error => console.error('Error:', error))
    
    } else {
        res.status(400).send({
            message: "Missing required information"
        })
    }
})

module.exports = router;