import React from 'react'
import MockLogInButton from './MockLogInButton'
//import Nav here, and insert under pageTitle

const Header = () => {
  return (
    <header className="pageHeader">
        <MockLogInButton />
        <h2 className="pageTitle">Titel</h2>
        <a href="/" className="pageLogo">Logo</a>
    </header>
  )
}

export default Header
