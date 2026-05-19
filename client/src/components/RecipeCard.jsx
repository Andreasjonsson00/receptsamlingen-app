const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-item">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.category}</p>
    </div>
  );
};

export default RecipeCard;
