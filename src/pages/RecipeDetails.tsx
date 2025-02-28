import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../api/recipes";
import { getIngredientsList, Meal } from "../types";

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery<{ meals: Meal[] }>({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id!),
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка при завантаженні рецепта</p>;
  if (!data?.meals?.length) return <p>Рецепт не знайдено</p>;

  const meal = data.meals[0];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
      <p><strong>Категорія:</strong> {meal.strCategory}</p>
      <p><strong>Регіон:</strong> {meal.strArea}</p>
      <h3>Інгредієнти:</h3>
      <ul>
        {getIngredientsList(meal).map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Інструкція:</h3>
      <p>{meal.strInstructions}</p>
      {meal.strYoutube && (
        <div>
          <h3>Відео:</h3>
          <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
            Дивитися на YouTube
          </a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
