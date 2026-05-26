import { Heart } from "react-feather";
import { useTranslation } from "react-i18next";
import styles from "./ToggleFavoriteButton.module.css";

const ToggleFavoriteButton = ({ isFavorite, onToggle, floating = false }) => {
  const { t } = useTranslation();

  const classes = [
    styles.favoriteButton,
    isFavorite ? styles.active : "",
    floating ? styles.floating : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      onClick={onToggle}
      aria-label={
        isFavorite
          ? t("actions.removeFromFavorites")
          : t("actions.addToFavorites")
      }
      aria-pressed={isFavorite}
    >
      <Heart
        size={18}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={2}
      />
    </button>
  );
};

export default ToggleFavoriteButton;