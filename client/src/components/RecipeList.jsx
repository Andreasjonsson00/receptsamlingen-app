import { getAll } from "../api/recipeApi"
import { useState, useEffect } from "react"
import Recipe from "./Recipe"
import SearchBar from "./SearchBar"

const RecipeList = ({ favorites = [], toggleFavorite }) => {
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState(null)
  // Search query state controls what the user has typed
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAll();
        setRecipes(data)
      } catch (err) {
        setError(err.message)
      }
    };
    fetchRecipes()
  }, []);

  // Filter recipes based on the search query
  // Converts both to lowercase so "Fish" matches "fish"
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  //       ^^^^^ byt ut mot rätt fältnamn
  );

  if (error) return <p>{error}</p>;

  return (
    <div>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <ul>
        {filteredRecipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.some((favorite) => favorite.id === recipe.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;