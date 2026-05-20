import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

/**
 * Navbar component
 *
 * Renders navigation links and a hamburger toggle for mobile screens.
 *
 * Routes:
 *   / → Home (recipe list)
 *   /create → Create a new recipe
 *   /favorites → Saved favourites
 */
function Navbar({isLoggedin}) {
  // Local state: controls whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-controls="nav-links"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/create" className={linkClass} onClick={handleLinkClick}>
            Create
          </NavLink>
        </li>

        {isLoggedIn && ( //Only shown when "logged in"
        <li>
          <NavLink to="/favorites" className={linkClass} onClick={handleLinkClick}>
            Favourites
          </NavLink>
        </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;