'use strict';

// Read existing recipes from localStorage
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes');

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : [];
    } catch (e) {
        return [];
    }
};

//Save the recipes to localStorage
const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

//remove a recipe from the list
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1);
    }
};

//Generate the DOM structure of a recipe
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a');
    const textEl = document.createElement('p');
    const ingredientEl = document.createElement('p');
    const statusEl = document.createElement('p');

    //Setup the recipe title text
    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title;
    } else {
        textEl.textContent = 'Unnamed Recipe';
    }

    textEl.classList.add('list-item_title');
    recipeEl.appendChild(textEl);

    //Setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`);
    recipeEl.classList.add('list-item');

    // //setup the ingredient message
    ingredientEl.textContent = checkIngredients(recipe.ingredients);
    ingredientEl.classList.add('list-item__subtitle1');
    recipeEl.appendChild(ingredientEl);

    //setup the status message
    statusEl.textContent = generateLastEdited(recipe.updatedAt);
    statusEl.classList.add('list-item__subtitle');
    recipeEl.appendChild(statusEl);

    return recipeEl;
};

//sort recipes one of three ways
const sortRecipes = (recipes, sortBy) => {
    if (sortBy === 'byEdited') {
        return recipes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'byCreated') {
        return recipes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt > b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'byAlpha') {
        return recipes.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    } else {
        return recipes;
    }
};

//render app recipes
const renderRecipes = (recipes, filters) => {
    const recipesEl = document.querySelector('#recipes');
    recipes = sortRecipes(recipes, filters.sortBy);
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    recipesEl.innerHTML = '';

    if (!recipes.length) {
        let greetParagraph = document.createElement('p');
        greetParagraph.innerText = `You have no recipes. Click on "Create Recipe" to get started!`;
        greetParagraph.classList.add('empty-message');
        document.querySelector('#recipes').appendChild(greetParagraph);

    } else {

        filteredRecipes.forEach((recipe) => {
            const recipeElement = generateRecipeDOM(recipe);
            recipesEl.appendChild(recipeElement);
        });
    }
};

//generate the checkIngredient message
const checkIngredients = (ingredients) => {
    console.log(ingredients);
    return `You have some of the ingredients`;
}

//generate the last edited message
const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`;