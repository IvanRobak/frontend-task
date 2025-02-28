import { Meal } from '../types';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  meal: Meal;
  onRemove?: (id: string) => void; // Додаємо можливість видалення
}

function RecipeCard({ meal, onRemove }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
        <p className="text-gray-600">
          <strong>Категорія:</strong> {meal.strCategory}
        </p>
        <p className="text-gray-600">
          <strong>Походження:</strong> {meal.strArea}
        </p>

        {/* Кнопка видалення з обраного (якщо є `onRemove`) */}
        {onRemove ? (
          <button
            onClick={() => onRemove(meal.idMeal)}
            className="mt-3 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-rose-300 to-rose-500 hover:from-rose-400 hover:to-rose-600 transition"
          >
            Видалити
          </button>
        ) : (
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="inline-block mt-3 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-teal-300 to-blue-400 hover:from-teal-400 hover:to-blue-500 transition"
          >
            Детальніше
          </Link>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
