const express = require('express')

const options = {number: 5, metaInformation: true};

const fetch = require('node-fetch');

const dotenv = require('dotenv');
dotenv.config();

var router = express.Router()

/** example GET request 
    localhost:5000/ingredients?query=ban

    output
    {
    "completed_ingredients": [
        "banana",
        "banana chips",
        "banana bread",
        "banana leaves",
        "banana peppers"
    ]
    }
 */
router.get('/', (req, res) =>
{
    let incomplete = req.query.query;
    if (incomplete)
    {
        getCompletedIngredientSearch(incomplete)
        .then(response => response.json())
            .catch(err => res.status(400).json({error_reason: error, 
                attempted_action: 'read json from completed query'}))
        .then(data => {
            let result = data.map(info => info.name)
            res.status(200).json({completed_ingredients: result});
            })
            .catch(error => res.status(400).json({error_reason: error, 
                attempted_action: "Get completed ingredients"}))
    } 
    else
    {
        res.status(400).json({error_reason: "incomplete query dne", 
                                attempted_action:"get completed ingredients"})
    }
});


async function getCompletedIngredientSearch(incompleteQuery)
{
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${incompleteQuery}&number=${options.number}&metaInformation=${options.metaInformation}`
    return await fetch(url)

}

module.exports = router;