import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";


function App() {
  const [favorites, setFavorites] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      <Header isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn} />
      <Navbar isLoggedIn = {isLoggedIn} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
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
      <Footer />
    </div>
  );
}

export default App;