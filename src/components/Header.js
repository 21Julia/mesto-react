import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип Место-Россия." className="header__logo" />
    </header>
  );
}

export default Header;