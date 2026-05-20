import React from 'react'


const MockLogInButton = () => {
    
    function handleLoginClick(){
        alert("Denna funktion finns inte ännu");
    }

  return (
    <button className="LogInBtn" onClick={handleLoginClick}>
      Login
    </button>
  )
}

export default MockLogInButton
