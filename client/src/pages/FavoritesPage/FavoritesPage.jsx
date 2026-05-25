import Recipe from "../../components/Recipe";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  return (
    <>
      <h2 className={styles["favorites-page__list-title"]}>Your Favorite Recipes</h2>
      {favorites.length === 0 ? ( // If there are no favorite recipes, show a message to the user.
        <p>You have no favorite recipes yet. Try adding some!</p>
      ) : (
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
      )}
    </>
  );
};

export default FavoritesPage;
