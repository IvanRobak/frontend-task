import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../api/recipes';
import { Meal } from '../types';
import { Link } from 'react-router-dom';

function RecipesList() {
  const { data, isLoading, error } = useQuery<{ meals: Meal[] }>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка при отриманні рецептів</p>;

  return (
    <div>
      <h1>Список рецептів</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data?.meals?.map((meal: Meal) => (
          <div key={meal.idMeal} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <img src={meal.strMealThumb} alt={meal.strMeal} width="150" />
            <h3>{meal.strMeal}</h3>
            <p>{meal.strCategory}</p>
            <Link to={`/recipe/${meal.idMeal}`}>Детальніше</Link>
            <Link to="/selected">Перейти до вибраних рецептів</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipesList;
