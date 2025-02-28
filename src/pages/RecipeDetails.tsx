import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../api/recipes';
import { addToSelectedRecipes } from '../api/selectedRecipes';
import { Meal } from '../types';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<{ meals: Meal[] }>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id!),
  });

  const addRecipeMutation = useMutation({
    mutationFn: async (recipe: Meal) => {
      queryClient.setQueryData(['selectedRecipes'], (prev: Meal[] | undefined) =>
        addToSelectedRecipes(prev || [], recipe)
      );
      return Promise.resolve(); // Додаємо, щоб відповідати очікуваному типу
    },
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка при завантаженні рецепта</p>;
  if (!data?.meals?.length) return <p>Рецепт не знайдено</p>;

  const meal = data.meals[0];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
      <p>
        <strong>Категорія:</strong> {meal.strCategory}
      </p>
      <button onClick={() => addRecipeMutation.mutate(meal)}>Додати до вибраних</button>
    </div>
  );
}

export default RecipeDetails;
