import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchRecipes, searchRecipes } from '../api/recipes';
import { Meal } from '../types';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function RecipesList() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery<{ meals: Meal[] }>({
    queryKey: searchQuery ? ['recipes', searchQuery] : ['recipes'],
    queryFn: () => (searchQuery ? searchRecipes(searchQuery) : fetchRecipes()),
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <h1>Список рецептів</h1>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/selected">Перейти до вибраних рецептів</Link>
        </div>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {isLoading && <p>Завантаження...</p>}
      {error && <p>Помилка при отриманні рецептів</p>}
      {data?.meals?.length === 0 && <p>Нічого не знайдено</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data?.meals?.map((meal: Meal) => (
          <div
            key={meal.idMeal}
            style={{ border: '1px solid #ddd', padding: '10px', width: '250px' }}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} width="100%" />
            <h3>{meal.strMeal}</h3>
            <p>{meal.strCategory}</p>
            <Link to={`/recipe/${meal.idMeal}`} style={{ display: 'block', marginTop: '10px' }}>
              Детальніше
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipesList;
