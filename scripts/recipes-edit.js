'use strict';

const titleElement = document.querySelector('#recipe-title');
const updatedElement = document.querySelector('#updated');
const bodyElement = document.querySelector('#recipe-body');
const removeButton = document.querySelector('#remove-recipe');
const recipeId = location.hash.substring(1);

let recipes = getSavedRecipes();
let recipe = recipes.find((recipe) => recipe.id === recipeId);

if (!recipe) {
    location.assign('/index.html');
}

titleElement.value = recipe.title;
updatedElement.textContent = generateLastEdited(recipe.updatedAt);
bodyElement.value = recipe.body;

titleElement.addEventListener('input', (e) => {
    recipe.title = e.target.value;
    recipe.updatedAt = moment().valueOf();
    updatedElement.textContent = generateLastEdited(recipe.updatedAt);
    saveRecipes(recipes);
});

bodyElement.addEventListener('input', (e) => {
    recipe.body = e.target.value;
    recipe.updatedAt = moment().valueOf();
    updatedElement.textContent = generateLastEdited(recipe.updatedAt);
    saveRecipes(recipes);
});

removeButton.addEventListener('click', () => {
    removeRecipe(recipe.id);
    saveRecipes(recipes);
    location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
    if (e.key === 'recipe') {
        recipes = JSON.parse(e.newValue);
        recipe = recipes.find((recipe) => recipe.id === recipeId);
    }

    if (!recipe) {
        location.assign('/index.html');
    }
    titleElement.value = recipe.title;
    bodyElement.value = recipe.body;
    recipe.updatedAt = moment().valueOf();
    updatedElement.textContent = generateLastEdited(recipe.updatedAt);
});

document.querySelector('#new-ingredient').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim();
    e.preventDefault();

    if (text.length > 0) {
        recipe.ingredients.push({
            id: uuidv4(),
            text,
            inStock: false
        });
        saveRecipes(recipes);
        renderIngredients(recipe)
        e.target.elements.text.value = '';
    }
});

const removeIngredient = (id) => {
    const ing = recipe.ingredients
    const ingredientIndex = ing.findIndex((ingredient) => ingredient.id === id);

    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1);
    }
};