import { Routes, Route } from "react-router-dom";
import RecipesList from "./pages/RecipesList";
import RecipeDetails from "./pages/RecipeDetails";
import SelectedRecipes from "./pages/SelectedRecipes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipesList />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/selected" element={<SelectedRecipes />} />
    </Routes>
  );
}

export default App;
