import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getById, remove } from "../../api/recipeApi";
import { translateCategory } from "../../constants/categories";
import styles from "./RecipeDetailsPage.module.css";

const RecipeDetailsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    try {
      if (!window.confirm(t("actions.confirmDelete"))) return;
      await remove(id);
      alert(t("alerts.recipeDeleted"));
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>{t("recipe.loading")}</p>;
  if (error) return <p className={styles.error}>{t("errors.fetchFailed")}</p>;
  if (!recipe) return <p>{t("pages.recipeNotFound")}</p>;

  const contentLang = recipe.language || "sv";

  return (
    <div className={styles.recipeDetail}>
      <h3 className={styles.title} lang={contentLang}>
        {recipe.title}
      </h3>
      <img
        src={recipe.image ? recipe.image : "/recipe_placeholder.png"}
        alt={
          recipe.title
            ? t("recipe.imageAlt", { title: recipe.title })
            : t("recipe.defaultImageAlt")
        }
        className={styles.image}
      />
      <div>
        <p className={styles.description} lang={contentLang}>
          {recipe.description}
        </p>

        <p>
          <strong>{t("recipe.ingredients")}:</strong>{" "}
          <span lang={contentLang}>{recipe.ingredients.join(", ")}</span>
        </p>
        <p>
          <strong>{t("recipe.instructions")}:</strong>{" "}
          <span lang={contentLang}>{recipe.instructions?.join(". ")}.</span>
        </p>

        {recipe.category_name?.filter(Boolean).length > 0 && (
          <p>
            <strong>{t("form.categories")}:</strong>{" "}
            {recipe.category_name
              .filter(Boolean)
              .map((c) => translateCategory(t, c))
              .join(", ")}
          </p>
        )}
      </div>
      <div className={styles.meta}>
        <p>
          <strong>{t("recipe.prepTime")}:</strong> {recipe.prep_time}{" "}
          {t("recipe.minutes")}
        </p>
        <p>
          <strong>{t("recipe.cookTime")}:</strong> {recipe.cook_time}{" "}
          {t("recipe.minutes")}
        </p>
        <p>
          <strong>{t("recipe.servings")}:</strong> {recipe.servings}
        </p>
      </div>

      <div className={styles.actions}>
        <Link to="/recipes" className={styles.button}>
          {t("recipe.backToRecipes")}
        </Link>
        <Link to={`/recipes/${id}/edit`} className={styles.button}>
          {t("actions.edit")}
        </Link>
        <button
          className={`${styles.button} ${styles.danger}`}
          onClick={handleDelete}
        >
          {t("actions.delete")}
        </button>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
