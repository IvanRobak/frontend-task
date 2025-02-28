import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Використовуємо useCallback, щоб debounce не створювався щоразу
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 500),
    [onSearch]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="🔍 Пошук рецепта..."
      value={searchTerm}
      onChange={handleChange}
      className="px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition w-64 shadow-sm"
    />
  );
}

export default SearchBar;
