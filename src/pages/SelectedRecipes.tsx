import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromSelectedRecipes } from '../api/selectedRecipes';
import { Meal } from '../types';

function SelectedRecipes() {
  const queryClient = useQueryClient();
  const { data: selectedRecipes } = useQuery<Meal[]>({
    queryKey: ['selectedRecipes'],
    queryFn: () => [],
    staleTime: Infinity, // Дані не зникають після оновлення сторінки
  });

  const removeRecipeMutation = useMutation({
    mutationFn: async (id: string) => {
      queryClient.setQueryData(['selectedRecipes'], (prev: Meal[] | undefined) =>
        removeFromSelectedRecipes(prev || [], id)
      );
      return Promise.resolve(); // Додаємо, щоб уникнути помилки з типами
    },
  });

  return (
    <div>
      <h1>Вибрані рецепти</h1>
      {selectedRecipes?.length === 0 ? (
        <p>Немає вибраних рецептів</p>
      ) : (
        <div>
          {selectedRecipes?.map(recipe => (
            <div key={recipe.idMeal} style={{ border: '1px solid #ddd', padding: '10px' }}>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} width="150" />
              <h3>{recipe.strMeal}</h3>
              <p>{recipe.strCategory}</p>
              <button onClick={() => removeRecipeMutation.mutate(recipe.idMeal)}>Видалити</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectedRecipes;
