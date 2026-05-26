import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = i18n.language?.startsWith("sv") ? "sv" : "en";

  return (
    <div className={styles.switcher}>
      <button
        type="button"
        className={`${styles.button} ${currentLang === "sv" ? styles.active : ""}`}
        onClick={() => changeLanguage("sv")}
        aria-label="Svenska"
      >
        SV
      </button>
      <button
        type="button"
        className={`${styles.button} ${currentLang === "en" ? styles.active : ""}`}
        onClick={() => changeLanguage("en")}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;