import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [favorites, setFavorites] = useState([]); // State to hold the list of favorite recipes objects. (all pages will have access to this state)

  const toggleFavorite = (recipe) => {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.some(
        (favorite) => favorite.id === recipe.id,
      );
      
      if (isFavorite) {
        return currentFavorites.filter((favorite) => favorite.id !== recipe.id);
      }
      
      return [...currentFavorites, recipe];
    });
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/recipes"
            element={
              <RecipeListPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
