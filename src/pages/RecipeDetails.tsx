import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeDetails } from '../hooks/useRecipeDetails';
import { useSelectedRecipes } from '../hooks/useSelectedRecipes';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useRecipeDetails(id!);
  const { selectedRecipes, addRecipeMutation } = useSelectedRecipes();

  if (isLoading) return <p className="text-center text-gray-600">Завантаження...</p>;
  if (error) return <p className="text-center text-red-600">Помилка при завантаженні рецепта</p>;
  if (!data?.meals?.length) return <p className="text-center text-gray-600">Рецепт не знайдено</p>;

  const meal = data.meals[0];
  const isRecipeSelected = selectedRecipes.some(recipe => recipe.idMeal === id);

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
