import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import styles from "./Navbar.module.css";

/**
 * Navbar component
 *
 * Renders navigation links and a hamburger toggle for mobile screens.
 *
 * Routes:
 *   / → Home (recipe list)
 *   /create → Create a new recipe
 *   /favorites → Saved favorites
 */
function Navbar({ isLoggedIn }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <nav className={styles.navbar} aria-label={t("nav.home")}>
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
      >
        {menuOpen ? (
          <span className={styles.icon} aria-hidden="true">✕</span>
        ) : (
          <span className={styles.icon} aria-hidden="true">☰</span>
        )}
      </button>

      <ul
        id="nav-links"
        className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}
        role="list"
      >
        <li>
          <NavLink to="/" end className={linkClass} onClick={handleLinkClick}>
            {t("nav.home")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" className={linkClass} onClick={handleLinkClick}>
            {t("nav.createRecipe")}
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
            <NavLink to="/favorites" className={linkClass} onClick={handleLinkClick}>
              {t("nav.favorites")}
            </NavLink>
          </li>
        )}
      </ul>

      <div className={styles.languageSwitcherWrapper}>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;