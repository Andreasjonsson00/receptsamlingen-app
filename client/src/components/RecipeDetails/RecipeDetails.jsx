import { useNavigate, useParams,} from "react-router-dom";
import { useEffect, useState } from "react";
import { getById, remove} from "../../api/recipeApi";
import { Link } from "react-router-dom";
import styles from "./RecipeDetails.module.css";

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
        if(!window.confirm('Are you sure you want to delete the recipe'))return;
        await remove(id);
        alert('recipe deleted successfully!')
        navigate('/')
    }
    catch(err){
        setError(err.message)
    }
        

  }

  if (loading) return <p>Loading recipe...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
   <div className={styles.recipeDetail}>
    <h3 className={styles.title}>{recipe.title}</h3>
    <img 
      src={recipe.image?recipe.image:'/default.png'} 
      alt={recipe.title} 
      className={styles.image}
    />
    <p>{recipe.description}</p>
    <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
    <p><strong>Instructions:</strong> {recipe.instructions?.join('. ')}.</p>
    <div className={styles.meta}>
      <p><strong>Preparation Time:</strong> {recipe.prep_time} minutes</p>
      <p><strong>Cooking Time:</strong>{recipe.cook_time} minutes</p>
      <p><strong>Servings:</strong>{recipe.servings}</p>
    </div>
    <div className={styles.actions}>
      <Link to='/recipes' className={styles.button}>Back to recipes</Link>
      <Link to={`/recipes/${id}/edit`} className={styles.button}>Edit</Link>
      <button className={`${styles.button} ${styles.danger}`} onClick={handleDelete}>Delete</button>
    </div>
  </div>
  )
}

export default RecipeDetails
