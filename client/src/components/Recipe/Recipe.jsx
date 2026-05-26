import { Link } from "react-router-dom";
import FavoriteButton from "../ToggleFavoriteButton/ToggleFavoriteButton";
import styles from "./Recipe.module.css";
   
const Recipe = ({
  recipe,
  isFavorite,
  toggleFavorite,
  horizontal = false,
  compact = false,
}) => {
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
          alt={recipe.title ? `Bild på ${recipe.title}` : "Receptbild"}
          className={styles.image}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{recipe.title}</h3>
          {recipe.description && (
            <p className={styles.description}>{recipe.description}</p>
          )}
          {recipe.category_name?.filter(Boolean).length > 0 && (
            <p className={styles.category}>
              {recipe.category_name.filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default Recipe;
