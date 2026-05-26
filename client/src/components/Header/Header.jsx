import MockLogInButton from '../MockLogInButton/MockLogInButton'
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} aria-label="Go to homepage">
        <h1 className={styles.title}>Receptsamlingen</h1>
        <p className={styles.tagline}>Recept för vardag och fest</p>
      </Link>
      <div className={styles.actions}>
        {isLoggedIn && (
          <p className={styles.welcome}>
            Welcome, Admin. Hope you are hungry!
          </p>
        )}
        <MockLogInButton
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
    </header>
  )
}

export default Header
