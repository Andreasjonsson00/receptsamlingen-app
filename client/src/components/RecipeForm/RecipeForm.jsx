//RecipeForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RecipeForm.module.css";

const CATEGORIES = [
  { id: "MainCourse", name: "Main Course" },
  { id: "Starter", name: "Starter" },
  { id: "Dessert", name: "Dessert" },
  { id: "Vegetarian", name: "Vegetarian" },
  { id: "Quick30", name: "Quick (<30 min)" },
];

const RecipeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    ingredients: [],
    instructions: [],
    prep_time: null,
    cook_time: null,
    servings: null,
    category: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        if (checked) return { ...prev, category: [...prev.category, name] };
        return { ...prev, category: prev.category.filter((c) => c !== name) };
      }
      if (name === "ingredients") {
        return { ...prev, ingredients: value.split(",").map((i) => i.trim()) };
      }
      if (name === "instructions") {
        return { ...prev, instructions: value.split("\n") };
      }
      if (type === "number") {
        return { ...prev, [name]: value ? parseInt(value, 10) : null };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.recipeForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add a recipe</h2>

      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={styles.input}
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Spaghetti Carbonara"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <input
          id="description"
          type="text"
          name="description"
          className={styles.input}
          value={formData.description}
          onChange={handleChange}
          placeholder="Short description"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="image" className={styles.label}>Image URL</label>
        <input
          id="image"
          name="image"
          className={styles.input}
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="ingredients" className={styles.label}>Ingredients</label>
        <input
          id="ingredients"
          type="text"
          name="ingredients"
          className={styles.input}
          value={formData.ingredients.join(", ")}
          placeholder="Ingredients (comma separated)"
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="instructions" className={styles.label}>Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          className={styles.textarea}
          value={formData.instructions.join("\n")}
          placeholder="One instruction per line"
          onChange={handleChange}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="prep_time" className={styles.label}>Prep time (min)</label>
          <input
            id="prep_time"
            type="number"
            min={1}
            name="prep_time"
            className={styles.input}
            value={formData.prep_time ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="cook_time" className={styles.label}>Cook time (min)</label>
          <input
            id="cook_time"
            type="number"
            min={1}
            name="cook_time"
            className={styles.input}
            value={formData.cook_time ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="servings" className={styles.label}>Servings</label>
          <input
            id="servings"
            type="number"
            min={1}
            name="servings"
            className={styles.input}
            value={formData.servings ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <fieldset className={styles.categories}>
        <legend className={styles.label}>Categories</legend>
        <div className={styles.checkboxGroup}>
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className={styles.checkbox}>
              <input
                type="checkbox"
                id={cat.id}
                name={cat.name}
                checked={formData.category.includes(cat.name)}
                onChange={handleChange}
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.actions}>
        <button type="submit" className="button button--primary">Submit</button>
        <Link to="/" className="button button--secondary">Cancel</Link>
      </div>
    </form>
  );
};

export default RecipeForm;