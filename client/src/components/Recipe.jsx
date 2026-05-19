import { Link } from "react-router-dom"
import FavoriteButton from "./FavoriteButton"

const Recipe = ({recipe, addFavorite}) => {
  return (
    <li >
        <Link to={`/recipes/${recipe.id}`}><p>{recipe.title}</p></Link>
        <p><img src={recipe.image||'/default.png'} width='200px' /></p>
        <p>{recipe.description}</p>
        <p>category: {recipe.category_name?.join(', ')}</p>
        <FavoriteButton addFavorite={addFavorite} />
    </li>
    
  )
}

export default Recipe