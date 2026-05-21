import MockLogInButton from './MockLogInButton'

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className="header">
      <div className="header__brand">
        <h1 className="header__title">Receptsamlingen</h1>
        <p className="header__tagline">Recept för vardag och fest</p>
      </div>
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