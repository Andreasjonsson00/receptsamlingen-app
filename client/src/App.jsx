import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

//pages
import HomePage from "./pages/HomePage/HomePage";
import RecipeListPage from "./pages/RecipeListPage/RecipeListPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import CreateRecipePage from "./pages/CreateRecipePage/CreateRecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage";
import EditRecipePage from "./pages/EditRecipePage";

const FAVORITES_STORAGE_KEY = "favorites";

const getStoredFavorites = () => {
  const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    const parsedFavorites = JSON.parse(storedFavorites);
    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
};

function App() {
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

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
    <BrowserRouter>
      <div className="app-layout">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Navbar isLoggedIn={isLoggedIn} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/recipes"
              element={
                <RecipeListPage
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
            <Route path="/create" element={<CreateRecipePage />} />
            <Route path='/recipes/:id/edit'element={<EditRecipePage/>}/>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
