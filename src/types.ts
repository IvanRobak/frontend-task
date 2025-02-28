export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  strIngredients: string[];
}

export const getIngredientsList = (meal: any): string[] => {
  return Array.from({ length: 20 }, (_, i) => meal[`strIngredient${i + 1}`])
    .filter(Boolean);
};
