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

export const countIngredients = (recipes: Meal[]) => {
  const ingredientCount: Record<string, number> = {};

  recipes.forEach(meal => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof Meal] as string;
      if (ingredient && ingredient.trim()) {
        ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      }
    }
  });

  return ingredientCount;
};
