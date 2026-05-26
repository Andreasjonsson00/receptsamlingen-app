import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CreateForm from "../../components/RecipeForm/RecipeForm";
import { add } from "../../api/recipeApi";
import styles from "./CreateRecipePage.module.css";

const CreateRecipePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      await add(formData);
      alert(t("alerts.recipeAdded"));
      navigate("/");
    } catch (err) {
      console.log(err.message);
      alert(t("errors.saveFailed"));
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