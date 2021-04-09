
const express = require('express')

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

var router = express.Router()

/**
 * @api {get} /recipesbyingredients sends a list of 10 recipes back based on ingredients recieved
 * @apiName GetRecipesByIngredients
 * @apiGroup Recipes
 * 
 * @apiParam {String} ingredients (Required)	A comma-separated list of ingredients that the recipes should contain.
 * @apiParam {String} ranking (Optional) Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiDescription This end point is for getting a list of recipes based on the ingredients you have
 */ 
router.get("/", (req, res) => {
    req.ingredients = req.query.ingredients;

    if(req.ingredients){
        let myIngredients = req.ingredients.replace(" ", "+")
        req.ranking ? myRanking = req.myRanking : myRanking = 1 

        let myUrl = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + process.env.SPOONACULAR_API_KEY + '&ranking=' + myRanking 
        + '&limitLicense=true&ignorePantry=true&ingredients=' + myIngredients
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