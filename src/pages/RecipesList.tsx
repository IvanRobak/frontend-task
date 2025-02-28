import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchRecipes, searchRecipes, fetchRecipesByCategory } from '../api/recipes';
import { Meal } from '../types';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

function RecipesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Відображаємо 4 страви на сторінці

  const { data, isLoading, error } = useQuery<{ meals: Meal[] }>({
    queryKey: selectedCategory
      ? ['recipes', selectedCategory]
      : searchQuery
      ? ['recipes', searchQuery]
      : ['recipes'],
    queryFn: () =>
      selectedCategory
        ? fetchRecipesByCategory(selectedCategory)
        : searchQuery
        ? searchRecipes(searchQuery)
        : fetchRecipes(),
  });

  // Загальна кількість сторінок
  const totalItems = data?.meals?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Визначаємо індекси для пагінації
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = data?.meals?.slice(startIndex, startIndex + itemsPerPage);

  // Функція для генерації кнопок пагінації
  const getPaginationButtons = () => {
    const pages: (number | string)[] = [];

    // Завжди додаємо першу сторінку
    pages.push(1);

    // Додаємо "..." якщо поточна сторінка >= 5
    if (currentPage > 4) {
      pages.push('...');
    }

    // Додаємо дві попередні, поточну та дві наступні сторінки
    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    // Додаємо "..." якщо поточна сторінка <= totalPages - 4
    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    // Завжди додаємо останню сторінку
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

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
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <CategoryFilter
        onSelectCategory={category => {
          setSelectedCategory(category);
          setCurrentPage(1);
        }}
      />

      {isLoading && <p>Завантаження...</p>}
      {error && <p>Помилка при отриманні рецептів</p>}
      {paginatedRecipes?.length === 0 && <p>Нічого не знайдено</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {paginatedRecipes?.map((meal: Meal) => (
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

      {/* Пагінація */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '5px' }}>
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            {'<<'}
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>

          {/* Генеруємо кнопки */}
          {getPaginationButtons().map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
              >
                {page}
              </button>
            ) : (
              <span key={index} style={{ padding: '5px' }}>
                ...
              </span>
            )
          )}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
            {'>>'}
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/selected">Перейти до вибраних рецептів</Link>
      </div>
    </div>
  );
}

export default RecipesList;
