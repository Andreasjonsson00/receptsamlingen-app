import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Recipe from "../components/Recipe/Recipe";
import SearchBar from "../components/SearchBar/SearchBar";
//import CategorySelect from "../components/CategorySelect/CategorySelect";
import { getAll } from "../api/recipeApi";
import FilterBar from "../components/FilterBar/FilterBar";
import styles from "./HomePage/HomePage.module.css";
import recipeListStyles from "../components/RecipeList/RecipeList.module.css";

const HomePage = ({ favorites, toggleFavorite }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  //const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAll();
        setRecipes(data);
        
        const shuffled = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
        setRecipes(shuffled);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRecipes();
  }, []);

  const filtered = recipes.filter((r) => {
  const matchesSearch = r.title?.toLowerCase().includes(search.toLowerCase()) ?? false;
    const matchesCategory =
      !category || r.category_name?.includes(category);
    return matchesSearch && matchesCategory;
  });

  const allCategories = [
    ...new Set(recipes.flatMap((r) => r.category_name || [])),
  ];

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <img src="/hero.jpg" alt="" className={styles.heroImage} />
      </section>

      <section className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar categories={allCategories} value = {category} onChange={setCategory} />
      </section>

      <section>
        <h2 className={styles.listTitle}>All of our Recipes</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={recipeListStyles.horizontal}>
          
          {filtered.slice(0, 6).map((recipe) => (
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

          <div className={styles.showMore}>
            <Link to="/recipes" className={styles.showMoreLink}>
              Show more recipes
            </Link>
          </div>
      </section>
    </div>
  );
};

export default HomePage;
