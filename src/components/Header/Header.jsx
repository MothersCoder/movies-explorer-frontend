import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header (props) {
  let currentUrl = useLocation();
  const pageStyleModificator =
    currentUrl.pathname === "/" ? 'header_page_main' :
    currentUrl.pathname === "/movies" ? 'header_page_movies' :
    currentUrl.pathname === "/saved-movies" ? 'header_page_saved-movies':
    currentUrl.pathname === "/profile" ? 'header_page_profile':
    currentUrl.pathname !== "/signup" && currentUrl.pathname !== "/signin" ? "" : 'header_page_sign';    ;

  return (
    <header className={`header ${pageStyleModificator}`}>
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
