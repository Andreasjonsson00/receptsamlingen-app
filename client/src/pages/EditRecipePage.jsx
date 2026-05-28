import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm/RecipeForm";
import { getById, update } from "../api/recipeApi";
import { useEffect, useState } from "react";

const EditRecipePage = () => {
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipe = await getById(id);
        setInitialData(recipe);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleEdit = async (formData) => {
    try {
      await update(id, formData);
      alert("Recipe updated successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p>{error}</p>;
  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <RecipeForm initialData={initialData} onSubmit={handleEdit} />
    </div>
  );
};

export default EditRecipePage;
