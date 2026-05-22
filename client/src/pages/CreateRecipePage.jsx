import CreateForm from "../components/RecipeForm"
import { useNavigate } from "react-router-dom";
import { add } from "../api/recipeApi";


const CreateRecipePage = () => {
    const navigate=useNavigate();

    const handleCreate=async(formData)=>{
     try {
      await add(formData);
      alert('Recipe added successfully!')
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
    
}
  return (
    <div>
      <CreateForm onSubmit={handleCreate} />
    </div>
  )
}

export default CreateRecipePage
