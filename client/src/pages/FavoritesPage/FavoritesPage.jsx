import Recipe from "../../components/Recipe/Recipe";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  return (
    <>
      {favorites.length > 0 ? (
        <>
          <h2 className={styles["favorites-page__list-title"]}>
            Your Favorite Recipes
          </h2>
          <ul>
            {favorites.map((recipe) => (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                isFavorite={true}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>You have no favorite recipes yet. Try adding some!</p>
      )}
    </>
  );
};

export default FavoritesPage;
