import { useTranslation } from "react-i18next";
import { translateCategory } from "../../constants/categories";
import styles from "./FilterBar.module.css";

const FilterBar = ({ categories = [], value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.filterBar}>
      <select
        className={styles.categorySelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{t("home.allCategories")}</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {translateCategory(t, category)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;