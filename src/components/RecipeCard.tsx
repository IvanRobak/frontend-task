import { Meal } from '../types';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  meal: Meal;
}

function RecipeCard({ meal }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
        <p className="text-gray-600">Категорія: {meal.strCategory}</p>
        <p className="text-gray-600">Походження: {meal.strArea}</p>
        <Link
          to={`/recipe/${meal.idMeal}`}
          className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Детальніше
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
