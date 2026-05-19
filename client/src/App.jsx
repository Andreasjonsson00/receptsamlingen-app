import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [favorites, setFavorites] = useState([]); // State to hold the list of favorite recipes objects. (all pages will have access to this state)

  const addFavorite = (recipe) => {
    setFavorites([...favorites, recipe]);
    console.log("Added to favorites:", favorites);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/recipes"
            element={<RecipeListPage addFavorite={addFavorite} />}
          />
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
          <Route
            path="/favorites"
            element={
              <FavoritesPage favorites={favorites} addFavorite={addFavorite} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
