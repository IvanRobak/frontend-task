import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchRecipes } from '../api/recipes';
import { Meal } from '../types';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

function RecipesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Відображаємо 4 страви на сторінці

  // Отримуємо всі рецепти
  const { data, isLoading, error } = useQuery<{ meals: Meal[] }>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  // Фільтруємо рецепти на фронтенді
  const filteredRecipes =
    data?.meals?.filter(
      meal =>
        (!selectedCategory || meal.strCategory === selectedCategory) &&
        (!searchQuery || meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

  // Загальна кількість сторінок після фільтрації
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  // Отримуємо рецепти для поточної сторінки
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Заголовок і пошук */}
      <div className="flex flex-col md:flex-row justify-between items-center py-6">
        <h1 className="text-3xl font-semibold text-gray-800">Список рецептів</h1>
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Фільтр категорій */}
      <CategoryFilter
        onSelectCategory={category => {
          setSelectedCategory(category);
          setCurrentPage(1);
        }}
      />

      {/* Повідомлення про стан */}
      {isLoading && <p className="text-center text-gray-600">Завантаження...</p>}
      {error && <p className="text-center text-red-600">Помилка при отриманні рецептів</p>}
      {paginatedRecipes.length === 0 && (
        <p className="text-center text-gray-600">Нічого не знайдено</p>
      )}

      {/* Відображення карток */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {paginatedRecipes.map(meal => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      {/* Пагінація */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {/* Посилання на вибрані рецепти */}
      <div className="mt-6 text-center">
        <Link to="/selected" className="text-blue-600 hover:underline">
          Перейти до вибраних рецептів
        </Link>
      </div>
    </div>
  );
}

export default RecipesList;
