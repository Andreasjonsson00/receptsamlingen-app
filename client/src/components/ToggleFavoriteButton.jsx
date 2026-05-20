const ToggleFavoriteButton = ({ isFavorite, onToggle }) => {
  return (
    <button onClick={onToggle}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default ToggleFavoriteButton;
