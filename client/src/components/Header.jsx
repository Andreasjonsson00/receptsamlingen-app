import MockLogInButton from './MockLogInButton'
//import Nav here, and insert under pageTitle

const Header = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <header className="pageHeader">
        <MockLogInButton isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
        {isLoggedIn && <p>Welcome, Admin. Hope you are hungry!</p>}
        <h2 className="pageTitle">Titel</h2>
        <a href="/" className="pageLogo">Logo</a>
    </header>
  )
}

export default Header
