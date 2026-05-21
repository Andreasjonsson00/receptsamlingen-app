import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Recipe from "../components/Recipe";
import SearchBar from "../components/SearchBar";
import { getAll } from "../api/recipeApi";

const HomePage = ({ favorites, toggleFavorite }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAll();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRecipes();
  }, []);

  const filtered = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !category || r.category_name?.includes(category);
    return matchesSearch && matchesCategory;
  });

  const featured = filtered.slice(0, 3);

  const allCategories = [
    ...new Set(recipes.flatMap((r) => r.category_name || [])),
  ];

  return (
    <div className="home-page">
      <section className="home-page__controls">
        <SearchBar value={search} onChange={setSearch} />
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </section>

      <section className="home-page__hero">
        <img src="/hero.jpg" alt="" className="home-page__hero-image" />
      </section>

      <section className="home-page__list">
        <h2 className="home-page__list-title">Add your favorites</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="recipe-list recipe-list--horizontal">
          {featured.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              isFavorite={
                favorites?.some((f) => f.id === recipe.id) ?? false
              }
              toggleFavorite={toggleFavorite}
              horizontal
            />
          ))}
        </div>

        {filtered.length > 6 && (
          <div className="home-page__show-more">
            <Link to="/recipes" className="button button--primary">
              Show more recipes
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;