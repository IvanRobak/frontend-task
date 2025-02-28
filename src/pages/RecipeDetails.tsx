import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRecipeById } from '../api/recipes';
import { addToSelectedRecipes } from '../api/selectedRecipes';
import { Meal } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Отримуємо деталі рецепта
  const { data, isLoading, error } = useQuery<{ meals: Meal[] }>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id!),
  });

  // Отримуємо список обраних рецептів
  const selectedRecipes = queryClient.getQueryData<Meal[]>(['selectedRecipes']) || [];

  // Перевіряємо, чи рецепт вже є у вибраному
  const isRecipeSelected = selectedRecipes.some(recipe => recipe.idMeal === id);

  // Додаємо рецепт до вибраного
  const addRecipeMutation = useMutation({
    mutationFn: async (recipe: Meal) => {
      queryClient.setQueryData(['selectedRecipes'], (prev: Meal[] | undefined) =>
        addToSelectedRecipes(prev || [], recipe)
      );
      return Promise.resolve();
    },
  });

  if (isLoading) return <p className="text-center text-gray-600">Завантаження...</p>;
  if (error) return <p className="text-center text-red-600">Помилка при завантаженні рецепта</p>;
  if (!data?.meals?.length) return <p className="text-center text-gray-600">Рецепт не знайдено</p>;

  const meal = data.meals[0];

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="m-15 px-5 py-2 rounded-lg  text-white bg-gradient-to-r from-teal-300 to-teal-500 hover:from-teal-400 hover:to-teal-600 transition"
      >
        ← Назад
      </button>
      {/* Кнопка "Назад" */}
      <div className="max-w-3xl mx-auto px-6 py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{meal.strMeal}</h1>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full max-w-md mx-auto rounded-lg shadow-md"
        />

        <p className="text-lg text-gray-700 mt-4">
          <strong>Категорія:</strong> {meal.strCategory}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Походження:</strong> {meal.strArea}
        </p>

        {/* Кнопка додавання у вибране */}
        <button
          onClick={() => addRecipeMutation.mutate(meal)}
          className={`mt-6 px-6 py-3 rounded-lg font-semibold transition ${
            isRecipeSelected
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-300 to-purple-500 hover:from-purple-400 hover:to-purple-600 text-white'
          }`}
          disabled={isRecipeSelected}
        >
          {isRecipeSelected ? 'Уже у вибраних' : 'Додати до вибраних'}
        </button>

        {/* Інструкція */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Інструкція</h2>
        <p className="text-gray-700 leading-relaxed">{meal.strInstructions}</p>
      </div>
    </>
  );
}

export default RecipeDetails;
