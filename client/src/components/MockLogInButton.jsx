const MockLogInButton = ({isLoggedIn, setIsLoggedIn}) => {
    
  function handleLoginClick(){
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <button className="LogInBtn" onClick={handleLoginClick}>
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  )
}

export default MockLogInButton
