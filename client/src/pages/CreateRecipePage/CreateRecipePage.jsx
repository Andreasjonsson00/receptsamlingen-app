import CreateForm from "../../components/RecipeForm/RecipeForm";
import { useNavigate } from "react-router-dom";
import { add } from "../../api/recipeApi";
import styles from "./CreateRecipePage.module.css";

const CreateRecipePage = () => {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await add(formData);
      alert("Recipe added successfully!");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formWrap}>
        <CreateForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default CreateRecipePage;
