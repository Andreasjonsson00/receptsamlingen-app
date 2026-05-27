import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAll } from "../../api/recipeApi";
import Recipe from "../Recipe/Recipe";
import SearchBar from "../SearchBar/SearchBar";
import FilterBar from "../FilterBar/FilterBar";
import styles from "./RecipeList.module.css";

const RecipeList = ({ favorites = [], toggleFavorite }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAll();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      recipe.category_name?.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const allCategories = [
    ...new Set(recipes.flatMap((recipe) => recipe.category_name || [])),
  ];

  if (error) return <p>{t("errors.fetchFailed")}</p>;

  if (loading) return <p>{t("loading")}</p>;

  return (
    <div>
      <section className="controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterBar
          categories={allCategories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </section>
      <ul className={styles.recipeList}>
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