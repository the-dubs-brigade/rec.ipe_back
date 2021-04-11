
const express = require('express')

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

var router = express.Router()

/**
 * @api {get} /randomRecipes sends a list of recipes back 
 * @apiName GetRandomecipes
 * @apiGroup Recipes
 * 
 * @apiParam {String} tags (Optional)	Optional tags to search recipes for
 * @apiParam {String} count (Required) How many recipes to return
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiDescription This end point is for getting a list of random recipes 
 */ 
router.get("/", (req, res) => {
    req.count = req.query.count;
    if(req.count){

        let myUrl = 'https://api.spoonacular.com/recipes/random?apiKey=' + process.env.SPOONACULAR_API_KEY
        + '&limitLicense=true&count' + req.count
        if (req.query.tags != undefined){
            req.tags = req.query.tags.replace(" ", "+")
            myUrl += '&tags='+ req.tags
        }
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