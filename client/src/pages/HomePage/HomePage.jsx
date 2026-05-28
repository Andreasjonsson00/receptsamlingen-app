import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Recipe from "../../components/Recipe/Recipe";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import { getAll } from "../../api/recipeApi";
import styles from "./HomePage.module.css";
import recipeListStyles from "../RecipeListPage/RecipeListPage.module.css";

const HomePage = ({ favorites, toggleFavorite }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const data = await getAll();
        const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 6);
        setRecipes(shuffled);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomRecipes();
  }, []);

  const filtered = recipes.filter((r) => {
    const matchesSearch =
      r.title?.toLowerCase().includes(search.toLowerCase()) ?? false;
    const matchesCategory = !category || r.category_name?.includes(category);
    return matchesSearch && matchesCategory;
  });

  const allCategories = [
    ...new Set(recipes.flatMap((r) => r.category_name || [])),
  ];

  if (error) return <p>{t("errors.fetchFailed")}</p>;
  if (loading) {
    return (
      <div className="spinnerContainer">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <img src="/hero.jpg" alt="" className={styles.heroImage} />
      </section>

      <section className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          categories={allCategories}
          value={category}
          onChange={setCategory}
        />
      </section>

      <section>
        <h2 className={styles.listTitle}>{t("home.allRecipes")}</h2>
        <div className={recipeListStyles.horizontal}>
          {filtered.slice(0, 6).map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              isFavorite={favorites?.some((f) => f.id === recipe.id) ?? false}
              toggleFavorite={toggleFavorite}
              horizontal
            />
          ))}
        </div>

        <div className={styles.showMore}>
          <Link to="/recipes" className={styles.showMoreLink}>
            {t("home.showMore")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
