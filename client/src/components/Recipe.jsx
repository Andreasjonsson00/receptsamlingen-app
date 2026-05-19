import { Link } from "react-router-dom"

const Recipe = ({recipe}) => {
  return (
    <li >
        <Link to={`/recipes/${recipe.id}`}><p>{recipe.title}</p></Link>
        <p><img src={recipe.image||'/default.png'} width='200px' /></p>
        <p>{recipe.description}</p>
        <p>category: {recipe.category_name?.join(', ')}</p>
    </li>
  )
}

export default Recipe