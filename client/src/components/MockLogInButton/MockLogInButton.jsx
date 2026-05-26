import styles from "./MockLogInButton.module.css";

const MockLogInButton = ({isLoggedIn, setIsLoggedIn}) => {
    
  function handleLoginClick(){
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <button className={styles.button} onClick={handleLoginClick}>
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  )
}

export default MockLogInButton
