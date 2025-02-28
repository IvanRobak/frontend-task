import { useQuery } from '@tanstack/react-query';
import { fetchRecipeById } from '../api/recipes';
import { Meal } from '../types';

// Хук для отримання деталей конкретного рецепта
export function useRecipeDetails(id: string) {
  return useQuery<{ meals: Meal[] }>({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipeById(id),
  });
}
