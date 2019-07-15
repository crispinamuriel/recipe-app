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

const renderIngredients = (recipe) => {
    const arrOfIngredients = recipe.ingredients;
    const ingredientEl = document.querySelector('#ingredients');

    if (arrOfIngredients.length > 0) {
        ingredientEl.innerHTML = '';
        arrOfIngredients.forEach((ingredient) => {
            ingredientEl.appendChild(generateIngredientDOM(ingredient));
        });
    } else {
        const messageEL = document.createElement('p');
        messageEL.classList.add('empty-message');
        messageEL.textContent = `Add some ingredients to your recipe!`;
        ingredientEl.appendChild(messageEL);
    }
}

const generateIngredientDOM = (ingredient) => {
    const ingEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkbox = document.createElement('input');
    const ingText = document.createElement('span');
    const removeButton = document.createElement('button');

    //setup ingredient checkbox
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = ingredient.inStock;
    containerEl.appendChild(checkbox);
    checkbox.addEventListener('change', () => {
        toggleIngredientStock(ingredient.id);
        saveRecipes(recipes);
        renderIngredients(recipe);
    });

    //setup the ingredient text
    ingText.textContent = ingredient.text;
    containerEl.appendChild(ingText);

    //setup container
    ingEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    ingEl.appendChild(containerEl);

    //setup the remove button
    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button--text');
    ingEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeIngredient(ingredient.id);
        saveRecipes(recipes);
        renderIngredients(recipe);
    })
    return ingEl;
}

renderIngredients(recipe);