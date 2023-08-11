import { Link, NavLink, useLocation } from "react-router-dom";
import profileImgButtonMain from '../../images/profile-button-img.svg';
import profileImgButtonLanding from '../../images/profile-button-img-landing.svg'
import { useState } from "react";

function Navigation (props) {
  let currentUrl = useLocation();
  const navidationLandingStyle = props.loggedIn ? 'navigation_landing-auth' : 'navigation_landing-unauth'

  const [isMenuOpen, setMenuOpen] = useState(false);

  function toggleMenu () {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className={`navigation ${currentUrl.pathname === '/' ? navidationLandingStyle : 'navigation_main'}`}>
        {
          props.loggedIn ? (
            <>
              <ul className={`navigation__navbar ${currentUrl.pathname === '/' ? 'navigation__navbar_landing' : 'navigation__navbar_main'}`}>
                <li className={`navigation__navbar-item ${currentUrl.pathname === '/' ? 'navigation__navbar-item_landing' : 'navigation__navbar-item_main'} ${currentUrl.pathname === '/movies' ? 'navigation__navbar-item_active' : ''}`}><NavLink className="navigation__link" to="/movies">Фильмы</NavLink></li>
                <li className={`navigation__navbar-item ${currentUrl.pathname === '/' ? 'navigation__navbar-item_landing' : 'navigation__navbar-item_main'} ${currentUrl.pathname === '/saved-movies' ? 'navigation__navbar-item_active' : ''}`}><NavLink className="navigation__link" to="/saved-movies">Сохраненные фильмы</NavLink></li>
              </ul>
              <Link className="navigation__link" to="/profile">
                {currentUrl.pathname === '/' ? (
                  <button className="navigation__button-landing">
                    <img className="button-landing__icon" src={profileImgButtonLanding} alt="Иконка человека" />
                    Аккаунт
                  </button>
                ) : (
                  <button className="navigation__button-main">
                    <p className="button-main__name">Аккаунт</p>
                    <div className="button-main__icon-background">
                      <img className="button-main__icon" src={profileImgButtonMain} alt="Иконка человека" />
                    </div>
                  </button>
                )}
              </Link>
            </>
            ) : (
              <ul className="navigation__navbar navigation__navbar_unauth">
                <li className="navigation__navbar-item navigation__navbar-item_unauth"><Link className="navigation__link" to="/signup">Регистрация</Link></li>
                <li className="navigation__navbar-item navigation__navbar-item_unauth"><Link className="navigation__link" to="/signin"><button className="navigation__button navigation__button_unauth">Войти</button></Link></li>
              </ul>
            )
        }
      </div>
      {props.loggedIn ? (
      <button type="button" className={`navigation__burger ${isMenuOpen ? 'navigation__burger_active' : ''}`} aria-label="Меню" onClick={toggleMenu}></button>
      ) : ""}
      <div className={`navigation__menu ${isMenuOpen ? 'navigation__menu_open' : ''}`}>
        <ul className={`navigation__navbar ${currentUrl.pathname === '/' ? 'navigation__navbar_landing' : 'navigation__navbar_main'}`}>
          <li className={`navigation__navbar-item ${currentUrl.pathname === '/' ? 'navigation__navbar-item_active' : ""}`}><NavLink className="navigation__link" to="/">Главная</NavLink></li>
          <li className={`navigation__navbar-item ${currentUrl.pathname === '/movies' ? 'navigation__navbar-item_active' : ""}`}><NavLink className="navigation__link" to="/movies">Фильмы</NavLink></li>
          <li className={`navigation__navbar-item ${currentUrl.pathname === '/saved-movies' ? 'navigation__navbar-item_active' : ""}`}><NavLink className="navigation__link" to="/saved-movies">Сохраненные фильмы</NavLink></li>
        </ul>
        <Link className="navigation__link" to="/profile">
          {currentUrl.pathname === '/' ? (
            <button className="navigation__button-landing">
              <img className="button-landing__icon" src={profileImgButtonLanding} alt="Иконка человека" />
              Аккаунт
            </button>
            ) : (
            <button className="navigation__button-main">
              <p className="button-main__name">Аккаунт</p>
              <div className="button-main__icon-background">
                <img className="button-main__icon" src={profileImgButtonMain} alt="Иконка человека" />
              </div>
            </button>
          )}
        </Link>
      </div>

    </>
  )
}

export default Navigation;
