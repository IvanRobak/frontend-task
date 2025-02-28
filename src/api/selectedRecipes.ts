import { Meal } from '../types';

export const addToSelectedRecipes = (prevRecipes: Meal[], newRecipe: Meal) => {
  if (prevRecipes.find(r => r.idMeal === newRecipe.idMeal)) {
    return prevRecipes; // Якщо рецепт вже є, не додаємо його вдруге
  }
  return [...prevRecipes, newRecipe];
};

export const removeFromSelectedRecipes = (prevRecipes: Meal[], id: string) => {
  return prevRecipes.filter(recipe => recipe.idMeal !== id);
};
