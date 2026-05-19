import RecipeList from "../components/RecipeList";

const FavoritesPage = ({ favorites, addFavorite }) => {
  return (
    <>
      {favorites.length === 0 ? (   // If there are no favorite recipes, show a message to the user.
        <p>You have no favorite recipes yet.</p>
      ) : (
        <RecipeList recipes={favorites} addFavorite={addFavorite} />
      )}
    </>
  );
};

export default FavoritesPage;
