import RecipeList from "../components/RecipeList";


const RecipeListPage = ({ addFavorite }) => {
  return (
    <div>
        <RecipeList addFavorite={addFavorite} />
      
    </div>
  )
}

export default RecipeListPage
