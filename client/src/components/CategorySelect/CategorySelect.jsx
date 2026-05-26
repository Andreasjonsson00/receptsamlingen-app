import styles from "./CategorySelect.module.css";

const CategorySelect = ({ value, onChange, categories }) => {
  return (
    <select
      className={styles['category-select']}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
