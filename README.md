# Quick 'n' Easy Recipes created by [The Dubs Brigade] for UWB Hacks at Home 2021

https://gray-cliff-0fad8b61e.azurestaticapps.net/#

# Introduction:

Quick 'n' Easy is designed to be a web application that generates recipes based upon ingredients that the user inputs into the search bar.  The main inspiration for this application comes from the fact that during the COVID-19 pandemic and subsequent quarantine, people needed to cook at home more often than before. We recognized that people often have limited ingredients at their disposal or are simply bored of the recipes that they already know. This tool can be used to generate new recipe ideas quickly using ingredients you already have at your disposal.

Quick 'n' Easy utilizes the Spoonacular API to generate the recipes. Spoonacular recipe API includes over 360,000 recipes with detailed information such as meal classification (vegetarian, vegan, etc), nutrition facts, and much more. The Quick 'n' Easy tool generates the 10 best matching recipes from the ingredients that the user inputs which maximizes the ingredients the user has, or minimizes the ingredients that the user does not have.

Future plans for Quick 'n' Easy are extensive, and The Dubs Brigade development team hopes to implement the features as they become ready. The following sections of this document will discuss the goals of the project, the desired user experience, implementation details, issues encountered, bugs fixed or still present, and future work to be done.

# Credits:
Spoonacular API
Create-react-app
Material-ui
Material-ui-search-bar
React-bootstrap

# Goals of the Project:

- Create a fullstack web application
- Utilize the Spoonacular API to generate recipes based upon ingredients inputted by the user
- Gain experience using React


# Desired User Experience:

The Dubs Brigade development team aimed to create a minimalistic UI for ease of use when interacting with our application.  When researching other products on the market we found that these applications often had clunky UI's that detracted from the user experience. By minimalizing the design, we aimed to create a user experience that is accessible to all people and that could easily be used from any device, at any time.

When the user first accesses Quick 'n' Easy, the homepage features a search bar and a list of randomly generated recipes. The user can either select one of the randomly generated recipes, or input ingredients into the search bar (each ingredients needs to be seperated by a comma) and then either pressing enter or clicking the search icon. 

If the user wants to select one of the randomly generated recipes, all the user needs to do is click the get recipe button under the recipe image, and the user will be linked to a website that contains the relevant recipe information. The user is able to navigate to searched recipes in the same manner.

# Implementation Details:

https://github.com/the-dubs-brigade


# Issues Encountered:

The Dubs Brigade development team faced many issues throughout the course of this project. For the entirety of the development team, this was our first significant project using React.js.  This in turn required each team member to do an extensive amount of research in order to get to a MVP. The majority of issues encountered came during the front-end portion of development.

# Bugs Fixed or Still Present:



# Future Work to be Done:

The Dubs Brigade development teams has many features we aim to add in the future. This include but are not limited to:

- Improving the user UI
- Authentication to enable users to have a persistent profile. This would enable users to favorite recipes and support other features to be implemented later
- Host the recipes locally so that the user does not need to be linked to another website
- Create a conversion tool for converting ingriedient measurements
- Create a tool for generating a shopping list when using recipes that the user does not have all the ingredients for
