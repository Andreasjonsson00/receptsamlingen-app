import Recipe from "../../components/Recipe/Recipe";
import styles from "./FavoritesPage.module.css";
import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredRecipes = favorites.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "" ||
      recipe.category_name?.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const allCategories = [
    ...new Set(favorites.flatMap((recipe) => recipe.category_name || [])),
  ];

  return (
    <>
      <section className="controls">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <FilterBar
          categories={allCategories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </section>

      {favorites.length > 0 ? (
        <>
          <h2 className={styles["favorites-page__list-title"]}>
            Your Favorite Recipes
          </h2>
      <ul className={styles.list}>
        {filteredRecipes.map((recipe) => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.some((favorite) => favorite.id === recipe.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
        </>
      ) : (
        <h2>
          You have no favorite recipes yet. Try adding some!
        </h2>
      )}
    </>
  );
};

export default FavoritesPage;
