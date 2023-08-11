import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header (props) {
  let currentUrl = useLocation();

  return (
    <header className={`header ${currentUrl.pathname !== "/signup" && currentUrl.pathname !== "/signin" ? "" : 'header_sign'}`}>
      <a className="header__link" href="/"><img className={`header__logo ${currentUrl.pathname !== "/signup" && currentUrl.pathname !== "/signin" ? "" : 'header__logo_sign'}`} src={logo} alt="Позитивный логотим сайта про меня :) "/></a>
      {
        currentUrl.pathname !== "/signup" && currentUrl.pathname !== "/signin" ?
          <Navigation
            loggedIn={props.loggedIn}
          /> : ""
      }
    </header>
  )
}

export default Header;
