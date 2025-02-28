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
      style={{
        padding: '8px 12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        width: '250px',
      }}
    />
  );
}

export default SearchBar;
