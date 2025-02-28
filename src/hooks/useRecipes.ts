import { useQuery } from '@tanstack/react-query';
import { fetchRecipes, fetchCategories } from '../api/recipes';
import { Meal } from '../types';

// Хук для отримання списку рецептів
export function useRecipes() {
  return useQuery<{ meals: Meal[] }>({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
}

// Хук для отримання категорій
export function useCategories() {
  return useQuery<{ meals: { strCategory: string }[] }>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}
