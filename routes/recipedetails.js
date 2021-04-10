
const express = require('express')

const fetch = require('node-fetch');

const dotenv = require('dotenv');
const { query } = require('express');
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
 router.get("/card", (req, res, next) => {
    req.id = req.query.id;

    if(req.id){
        let myUrl = 'https://api.spoonacular.com/recipes/' + req.id + '/information?apiKey=' 
            + process.env.SPOONACULAR_API_KEY 
        console.log(myUrl)
        
        fetch(myUrl)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                res.title = json.title
                res.image = json.image
                console.log(json.extendedIngredients)
                for (ing in json.extendedIngredients)
                    res.ingredients += ing.amount + " " + ing.unit + " " + ing.name + "\n"

                for (step in json.analyzedInstructions[0].steps)
                    res.instructions += step.step + "\n"
                
                res.readyInMinutes = json.readyInMinutes
                res.servings = json.servings
                next()
            })
            .catch(error => console.error('Error:', error))
    
    } else {
        res.status(400).send({
            message: "Missing required information"
        })
    }
}, (req, res) => {
    let queryString = '&title=' + res.title + '&image=' + res.image + '&ingredients=' + res.ingredients + '&instructions=' 
    + res.instructions + '&readyInMinutes=' + res.readyInMinutes + '&servings=' + res.servings + '&mask=ellipseMask'
    let encodedQueryString = encodeURI(queryString)
    let myUrl = 'https://api.spoonacular.com/recipes/visualizeRecipe/?apiKey=' + process.env.SPOONACULAR_API_KEY 
    + encodedQueryString

    console.log(myUrl)

    // fetch(myUrl)
    //     .then(response => response.json())
    //     .then(json => {
    //         res.send(json)
    //     })
})

module.exports = router;