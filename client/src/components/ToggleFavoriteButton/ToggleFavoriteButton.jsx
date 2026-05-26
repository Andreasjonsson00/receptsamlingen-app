import { Heart } from "react-feather";
import styles from "./ToggleFavoriteButton.module.css";

const ToggleFavoriteButton = ({ isFavorite, onToggle, floating = false }) => {
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
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
