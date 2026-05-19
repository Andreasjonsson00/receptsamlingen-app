const FavoritesPage = ({ favorites, setFavorites }) => {
  return (
    <>
      {favorites.length === 0 ? (   // If there are no favorite recipes, show a message to the user.
        <p>You have no favorite recipes yet.</p>
      ) : (
        <div className="favorites-list"> 
          {favorites.map((recipe) => (   // If there are favorite recipes, display them in a list.
            <div key={recipe.id} className="favorite-item">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.category}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FavoritesPage;
