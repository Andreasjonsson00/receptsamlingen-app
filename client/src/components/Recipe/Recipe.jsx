import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { translateCategory } from "../../constants/categories";
import FavoriteButton from "../ToggleFavoriteButton/ToggleFavoriteButton";
import styles from "./Recipe.module.css";

const Recipe = ({
  recipe,
  isFavorite,
  toggleFavorite,
  horizontal = false,
  compact = false,
}) => {
  const { t } = useTranslation();
  const contentLang = recipe.language || "sv";

  const itemClass = [
    styles.item,
    horizontal ? styles.horizontal : "",
    compact ? styles.compact : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={itemClass}>
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => toggleFavorite(recipe)}
        floating
      />
      <Link to={`/recipes/${recipe.id}`} className={styles.link}>
        <img
          src={recipe.image || "/recipe_placeholder.png"}
          alt={
            recipe.title
              ? t("recipe.imageAlt", { title: recipe.title })
              : t("recipe.defaultImageAlt")
          }
          className={styles.image}
        />
        <div className={styles.content}>
          <h3 className={styles.title} lang={contentLang}>
            {recipe.title}
          </h3>
          {recipe.description && (
            <p className={styles.description} lang={contentLang}>
              {recipe.description}
            </p>
          )}
          {recipe.category_name?.filter(Boolean).length > 0 && (
            <p className={styles.category}>
              {recipe.category_name
                .filter(Boolean)
                .map((c) => translateCategory(t, c))
                .join(", ")}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default Recipe;