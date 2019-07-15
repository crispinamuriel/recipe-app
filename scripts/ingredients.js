'use strict';
const recipeId = location.hash.substring(1);
let recipes = getSavedRecipes();
let recipe = recipes.find((recipe) => recipe.id === recipeId);