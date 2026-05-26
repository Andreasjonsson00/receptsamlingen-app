import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MockLogInButton from "../MockLogInButton/MockLogInButton";
import styles from "./Header.module.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} aria-label={t("header.goToHomepage")}>
        <h1 className={styles.title}>{t("header.title")}</h1>
        <p className={styles.tagline}>{t("header.tagline")}</p>
      </Link>
      <div className={styles.actions}>
        {isLoggedIn && (
          <p className={styles.welcome}>{t("header.welcome")}</p>
        )}
        <MockLogInButton
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
    </header>
  );
};

export default Header;