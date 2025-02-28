import { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

function RecipesList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { data, isLoading, error } = useRecipes();

  const filteredRecipes =
    data?.meals?.filter(
      meal =>
        (!selectedCategory || meal.strCategory === selectedCategory) &&
        (!searchQuery || meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()))
    ) || [];

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-15">
      <h1 className="text-4xl font-bold text-center text-gray-800 py-6">Список рецептів</h1>

      {/* Панель пошуку та фільтрації */}
      <div className="flex flex-col md:flex-row justify-between items-center py-4">
        <CategoryFilter
          onSelectCategory={category => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
        <SearchBar onSearch={setSearchQuery} />
      </div>

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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <div className="mt-6 text-center">
        <Link to="/selected" className="text-purple-600 hover:underline text-lg font-semibold">
          Перейти до вибраних рецептів →
        </Link>
      </div>
    </div>
  );
}

export default RecipesList;
