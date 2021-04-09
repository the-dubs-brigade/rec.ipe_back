const API_KEY = process.env.SPOONACULAR_API_KEY

const express = require('express')

const fetch = require('node-fetch');

var router = express.Router()


//TODO - this is an example of endpoints I wrote for another project that utilized an external API - to be fitted for our purposes.

/**
 * @api {get} /One-call weather Request to access current, hourly, and daily weather forecast.
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
    console.log(req.params["ingredients"])
    if(req.ingredients){
        let myIngredients = req.ingredients.replace(" ", "+")
        req.ranking ? myRanking = req.myRanking : myRanking = 1 

        let url = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + API_KEY + '&ranking=' + myRanking 
        + '&limitlicense=true&ignorepantry=true&ingredients=' + myIngredients
        
        //When this web service gets a request, make a request to the external weather api
        fetch(url)
            .then(response => response.json())
            .then(json => console.log(json))
    
    } else {
        res.status(400).send({
            message: "Missing required information"
        })
    }
})

/**
 * @api {post} /One-call weather Request to access current, hourly, and daily weather forecast.
 * @apiName OneCallWeather
 * @apiGroup Weather
 * 
 * @apiParam {String} lat, lon	(required)	Geographical coordinates (latitude, longitude)
 * @apiParam {String} unit (Required) Units of measurement. standard, metric and imperial units are available. 
 * 
 * @apiHeader {String} authorization JWT provided from Auth get
 * 
 * @apiError (404: Unknown Error) {String} error message 
 * 
 * @apiError (400: Missing Parameters) {String} message "Missing required information"
 * 
 * @apiDescription This end point is for getting the current weather and weather forecast for a location.
 */ 
router.post("/map", (req, res) => {

    if(req.body.lat && req.body.long && req.body.units){
        let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + req.body.lat 
        + '&lon=' + req.body.long + '&exclude=minutely,alerts&units=' + req.body.units + '&appid=' + process.env.OPEN_WEATHER_API_KEY
        
        //When this web service gets a request, make a request to the external weather api
        request(url, function (error, response, body) {
            if (error) {
                res.send(error)
            } else {
                var n = body.indexOf("{")
                var nakidBody = body.substring(n - 1)
    
                res.send(nakidBody)
            }
        })
    } else {
        res.status(400).send({
            message: "Missing required information"
        })
    }
})


module.exports = router;