import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
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
  <BrowserRouter>
    <div className="app-layout">
    <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    <Navbar isLoggedIn = {isLoggedIn} />
        <main className="main-content">
         <Routes>
            <Route path="/" element={
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
          </Routes>
        </main>

      <Footer />
    </div>
  </BrowserRouter>
  );
}

export default App;