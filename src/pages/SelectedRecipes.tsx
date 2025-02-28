import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromSelectedRecipes, countIngredients } from '../api/selectedRecipes';
import { Meal } from '../types';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';

function SelectedRecipes() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Отримуємо вибрані рецепти (імітація кешу)
  const { data: selectedRecipes = [] } = useQuery<Meal[]>({
    queryKey: ['selectedRecipes'],
    queryFn: () => [],
    staleTime: Infinity, // Кеш зберігається
  });

  // Видалення рецепта з вибраного
  const removeRecipeMutation = useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData(['selectedRecipes'], (prev: Meal[] | undefined) =>
        removeFromSelectedRecipes(prev || [], id)
      );
      return Promise.resolve();
    },
  });

  // Підрахунок інгредієнтів
  const ingredientCounts = countIngredients(selectedRecipes);

  return (
    <div className="max-w-7xl mx-auto p-15">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-5 py-2 rounded-lg text-white bg-gradient-to-r from-teal-300 to-teal-500 hover:from-teal-400 hover:to-teal-600 transition"
      >
        ← Назад
      </button>

      <h1 className="text-4xl font-bold text-center text-gray-800 py-6">Обрані рецепти</h1>

      {selectedRecipes.length === 0 ? (
        <p className="text-center text-gray-600">Немає вибраних рецептів</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Список інгредієнтів
          </h2>
          <ul className="bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto">
            {Object.entries(ingredientCounts).map(([ingredient, count]) => (
              <li key={ingredient} className="text-gray-700">
                {ingredient}: {count} шт.
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 text-center mt-6">Обрані страви</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {selectedRecipes.map(meal => (
              <RecipeCard key={meal.idMeal} meal={meal} onRemove={removeRecipeMutation.mutate} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SelectedRecipes;
