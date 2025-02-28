import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addToSelectedRecipes,
  removeFromSelectedRecipes,
  countIngredients,
} from '../api/selectedRecipes';
import { Meal } from '../types';

export function useSelectedRecipes() {
  const queryClient = useQueryClient();

  const { data: selectedRecipes = [] } = useQuery<Meal[]>({
    queryKey: ['selectedRecipes'],
    queryFn: () => [],
    staleTime: Infinity,
  });

  const addRecipeMutation = useMutation({
    mutationFn: async (recipe: Meal) => {
      queryClient.setQueryData(['selectedRecipes'], (prev: Meal[] | undefined) =>
        addToSelectedRecipes(prev || [], recipe)
      );
      return Promise.resolve();
    },
  });

  const removeRecipeMutation = useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData(['selectedRecipes'], (prev: Meal[] | undefined) =>
        removeFromSelectedRecipes(prev || [], id)
      );
      return Promise.resolve();
    },
  });

  const ingredientCounts = countIngredients(selectedRecipes);

  return { selectedRecipes, addRecipeMutation, removeRecipeMutation, ingredientCounts };
}
