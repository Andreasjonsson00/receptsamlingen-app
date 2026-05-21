import { Link } from "react-router-dom";
   import FavoriteButton from "./ToggleFavoriteButton";
   
   const Recipe = ({ recipe, isFavorite, toggleFavorite }) => {
     return (
       <article className="recipe-item">
      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={() => toggleFavorite(recipe)}
        floating
      />
      <Link to={`/recipes/${recipe.id}`} className="recipe-item__link">
        <img
          src={recipe.image || "/recipe_placeholder.png"}
          alt={recipe.title ? `Bild på ${recipe.title}` : "Receptbild"}
          className="recipe-item__image"
        />
        <div className="recipe-item__content">
          <h3 className="recipe-item__title">{recipe.title}</h3>
          {recipe.description && (
            <p className="recipe-item__description">{recipe.description}</p>
          )}
          {recipe.category_name?.filter(Boolean).length > 0 && (
            <p className="recipe-item__category">
              {recipe.category_name.filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
};

export default Recipe;