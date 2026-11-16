import {readData} from '../utils/fileHandler.js';

export const findRecipes = async ({ingredient, keyword}) => {
    const recipes = await readData();

    return recipes.filter(recipe => {
        let matchIngredient = true;
        let matchKeyword = true;

        //Search by ingredient
        if (ingredient) {
            const searchIngredient = ingredient.toLowerCase();
            matchIngredient = Array.isArray(recipe.ingredients)
                ? recipe.ingredients.some(ing => ing.toLowerCase().includes(searchIngredient))
                : typeof recipe.ingredients === 'string' && recipe.ingredients.toLowerCase().includes(searchIngredient);
        }

        //Keyword search across the title, description and ingredients
        if (keyword) {
            const searchKeyword = keyword.toLowerCase();
            const titleMatch = recipe.title && recipe.title.toLowerCase().includes(searchKeyword);
            const descriptionMatch = recipe.description && recipe.description.toLowerCase().includes(searchKeyword);
            const ingredientMatch = Array.isArray(recipe.ingredients)
                ? recipe.ingredients.some(ing => ing.toLowerCase().includes(searchKeyword))
                : typeof recipe.ingredients === 'string' && recipe.ingredients.toLowerCase().includes(searchKeyword);

            matchesKeyword = titleMatch || descriptionMatch || ingredientMatch;
        }

        return matchIngredient && matchesKeyword;
    });
};