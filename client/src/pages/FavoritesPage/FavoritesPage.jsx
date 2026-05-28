import { useState } from "react";
import { useTranslation } from "react-i18next";
import Recipe from "../../components/Recipe/Recipe";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredRecipes = favorites.filter((recipe) => {
    const matchesSearch = recipe.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || recipe.category_name?.includes(category);

    return matchesSearch && matchesCategory;
  });

  const allCategories = [
    ...new Set(favorites.flatMap((recipe) => recipe.category_name || [])),
  ];

  return (
    <>
      <section className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          categories={allCategories}
          value={category}
          onChange={setCategory}
        />
      </section>

      {filteredRecipes.length === 0 ? (
        <h2>{t("pages.favoritesEmpty")}</h2>
      ) : (
        <>
          <h2 className={styles["favorites-page__list-title"]}>
            {t("pages.favoritesTitle")}
          </h2>

          <ul className={styles.list}>
            {filteredRecipes.map((recipe) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.some(
                  (favorite) => favorite.id === recipe.id,
                )}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default FavoritesPage;
