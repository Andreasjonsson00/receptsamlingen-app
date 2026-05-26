import MockLogInButton from './MockLogInButton'
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className="header">
      <Link to="/" className="header__brand" aria-label="Go to homepage">
        <h1 className="header__title">Receptsamlingen</h1>
        <p className="header__tagline">Recept för vardag och fest</p>
      </Link>
      <div className="header__actions">
        {isLoggedIn && (
          <p className="header__welcome">
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
