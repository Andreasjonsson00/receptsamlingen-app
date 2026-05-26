import { useTranslation } from "react-i18next";
import styles from "./SearchBar.module.css";

const SearchBar = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder={t("search.placeholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;