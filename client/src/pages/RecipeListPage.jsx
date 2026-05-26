import RecipeList from "../components/RecipeList/RecipeList";

const RecipeListPage = ({ favorites, toggleFavorite }) => {
  return (
    <div>
      <RecipeList favorites={favorites} toggleFavorite={toggleFavorite} />
    </div>
  );
};

export default RecipeListPage;
