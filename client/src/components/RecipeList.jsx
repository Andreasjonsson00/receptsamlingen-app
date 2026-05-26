import { getAll } from "../api/recipeApi"
import { useState, useEffect } from "react"
import Recipe from "./Recipe"
import SearchBar from "./SearchBar"
import FilterBar from "./FilterBar"

const RecipeList = ({ favorites = [], toggleFavorite }) => {
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState(null)

  // Search query state controls what the user has typed
  const [searchQuery, setSearchQuery] = useState("")

  //Controls filtering
  const [selectedCategory, setSelectedCategory] = useState("");

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
  const filteredRecipes = recipes.filter((recipe) => {

    const matchesSearch = recipe.title
    .toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "" ||
    recipe.category_name?.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const allCategories = [
    ...new Set(recipes.flatMap((recipe) => recipe.category_name || [])),
  ]

  if (error) return <p>{error}</p>;

  return (
    <div>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <FilterBar 
      categories={allCategories} 
      value = {selectedCategory} 
      onChange={setSelectedCategory}
      />

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