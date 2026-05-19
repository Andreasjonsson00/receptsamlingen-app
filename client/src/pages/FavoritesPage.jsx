import Recipe from "../components/Recipe";

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  return (
    <>
      {favorites.length === 0 ? ( // If there are no favorite recipes, show a message to the user.
        <p>You have no favorite recipes yet.</p>
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
