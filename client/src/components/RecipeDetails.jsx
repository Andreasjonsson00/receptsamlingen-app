import { useNavigate, useParams,} from "react-router-dom";
import { useEffect, useState } from "react";
import { getById, remove} from "../api/recipeApi";
import { Link } from "react-router-dom";

const RecipeDetails = () => {
  const navigate=useNavigate()
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getById(id);
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete=async()=>{
    try{
        if(!window.confirm('Are you sur you want to delete the recipe'))return;
        await remove(id);
        alert('recipe deleted!')
        navigate('/recipes')
    }
    catch(err){
        setError(err.message)
    }
        

  }

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p style={{color:"red"}}>Error: {error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
   <div>
    <h3>{recipe.title}</h3>
    <img src={recipe.image?recipe.image:'/default.png'} alt={recipe.title} width="250" />
    <p>{recipe.description}</p>
    <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
    <p><strong>Instructions:</strong> {recipe.instructions?.join(' ')}.</p>
    <p><strong>Preparation Time:</strong> {recipe.prep_time} minutes</p>
    <p><strong>Cooking Time:</strong>{recipe.cook_time} minutes</p>
    <p><strong>Servings:</strong>{recipe.servings}</p>
    <Link to='/recipes'>Back to recipes</Link>
    <Link to={`/recipes/${id}/edit`}><button>Edit</button></Link>
    <button onClick={handleDelete}>Delete</button>
  </div>
  )
}

export default RecipeDetails