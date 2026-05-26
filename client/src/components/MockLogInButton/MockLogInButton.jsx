import { useTranslation } from "react-i18next";
import styles from "./MockLogInButton.module.css";

const MockLogInButton = ({ isLoggedIn, setIsLoggedIn }) => {
  const { t } = useTranslation();

  function handleLoginClick() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <button className={styles.button} onClick={handleLoginClick}>
      {isLoggedIn ? t("nav.logout") : t("nav.login")}
    </button>
  );
};

export default MockLogInButton;