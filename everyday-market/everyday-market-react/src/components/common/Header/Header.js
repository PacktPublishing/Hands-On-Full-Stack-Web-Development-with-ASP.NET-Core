import React from 'react';
import './Header.css';
import headerLogo from '../../../assets/logo.png';

const Header = (props) => (
  <header className="app-header app-bg">
    <div className="maxHeight flex flex-align-items--center">
      <img src={headerLogo} className="app-logo" alt="logo" />
      <span className="app-slogan">Shop 'till you Drop</span>
    </div>
  </header>
);

export default Header;
