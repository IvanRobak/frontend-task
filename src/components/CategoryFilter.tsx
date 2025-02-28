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

  if (isLoading) return <p>Завантаження категорій...</p>;
  if (error) return <p>Помилка при отриманні категорій</p>;

  return (
    <select
      onChange={e => onSelectCategory(e.target.value)}
      style={{ padding: '8px', fontSize: '16px' }}
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
