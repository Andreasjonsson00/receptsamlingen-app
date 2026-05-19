import "./App.css";
import { useState } from "react";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [favorites] = useState([ // State to hold the list of favorite recipes objects. (all pages will have access to this state)
    {
      id: 1,
      title: "Pasta Primavera", // Mock data for a favorite recipes
      category: "Vegetariskt",
      image: "pasta.jpg",
    },

    {
      id: 2,
      title: "Chokladkaka",
      category: "Dessert",
      image: "cake.jpg",
    },
  ]);

  return (
    <>
      <FavoritesPage favorites={favorites} />
    </>
  );
}

export default App;
