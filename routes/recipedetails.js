
const express = require('express')

const fetch = require('node-fetch');

var FormData = require('form-data');

var fs = require('fs');

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

    if (req.id) {

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
 * @apiDescription This end point is for creating a recipe card for displaying
 */
router.get("/card", (req, res, next) => {
    req.id = req.query.id;

    if (req.id) {
        let myUrl = 'https://api.spoonacular.com/recipes/' + req.id + '/information?apiKey='
            + process.env.SPOONACULAR_API_KEY
        console.log(myUrl)

        fetch(myUrl)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                req.title = json.title
                req.imageUrl = json.image
                req.ingredients = ""
                json.extendedIngredients.forEach(ing => {
                    req.ingredients += ing.amount + " " + ing.unit + " " + ing.name + "\n"
                })  
                json.analyzedInstructions[0].steps.forEach(step => {
                    req.instructions += step.step + "\n"
                })
                req.readyInMinutes = json.readyInMinutes
                req.servings = json.servings

                fetch(req.imageUrl).then(response => {
                    return response.buffer()
                }).then(buffer => {
                    console.log(buffer)
                    res.buffer = buffer
                    next()
                })
                // const response = await fetch(req.imageUrl);
                // const buffer = await response.buffer();
                // fs.writeFile(`./temp.jpg`, buffer, () => 
                //   console.log('finished downloading image!'));
               
            })
            .catch(error => console.error('Error:', error))

    } else {
        res.status(400).send({
            message: "Missing required information"
        })
    }
}, (req, res) => {
    // const data = {
    //     apiKey: process.env.SPOONACULAR_API_KEY,
    //     title: req.title,
    //     image: res.buffer,
    //     ingredients: req.ingredients,
    //     instructions: req.instructions,
    //     readyInMinutes: req.readyInMinutes,
    //     servings: req.servings,
    //     mask: 'ellipseMask',
    // };

    // console.log(JSON.stringify(data))


    let url = 'https://api.spoonacular.com/recipes/visualizeRecipe?apiKey=' 
        + process.env.SPOONACULAR_API_KEY
    let myFormData = new FormData();
    myFormData.append('apiKey', process.env.SPOONACULAR_API_KEY)
    myFormData.append('title', req.title);
    myFormData.append('image', res.buffer, {contentType: 'image/jpeg', filename: 'temp.jpg'});
    myFormData.append('ingredients', req.ingredients);
    myFormData.append('instructions', req.instructions);
    myFormData.append('readyInMinutes', req.readyInMinutes);
    myFormData.append('servings', req.servings);
    myFormData.append('mask', 'ellipseMask');
    myFormData.append('backgroundImage', 'none')
    myFormData.append('author', 'none')
    myFormData.append('backgroundColor', '#ffffff')
    myFormData.append('fontColor', '#000000')
    myFormData.append('source', 'spoonacular.com')

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: myFormData,
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            res.send(json)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})

module.exports = router;