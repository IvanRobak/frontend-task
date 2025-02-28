import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/recipes';

interface CategoryFilterProps {
  onSelectCategory: (category: string) => void;
}

function CategoryFilter({ onSelectCategory }: CategoryFilterProps) {
  const { data, isLoading, error } = useQuery<{ meals: { strCategory: string }[] }>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) return <p className="text-center text-gray-600">Завантаження категорій...</p>;
  if (error) return <p className="text-center text-red-600">Помилка при отриманні категорій</p>;

  return (
    <select
      onChange={e => onSelectCategory(e.target.value)}
      className="px-4 py-2 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition w-64 shadow-sm bg-white"
    >
      <option value="">Усі категорії</option>
      {data?.meals?.map(category => (
        <option key={category.strCategory} value={category.strCategory}>
          {category.strCategory}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
