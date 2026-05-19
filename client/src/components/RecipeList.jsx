import { getAll } from "../../api/recipeApi"
import { useState,useEffect } from "react"
import Recipe from "./Recipe"

const RecipeList = ({ addFavorite }) => {
    const[recipes,setRecipes]=useState([])
    const[error,setError]=useState(null)
  

    useEffect(()=>{
        const fetchRecipes=async()=>{
            try{
                const data=await getAll();
                setRecipes(data)}
            
            catch(err){
                setError(err.message)
            }};fetchRecipes()
        
    },[]);

 

  if (error) return <p>{error}</p>;

  return (
    <div>
    
      <ul>
        {recipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} addFavorite={addFavorite} />
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;