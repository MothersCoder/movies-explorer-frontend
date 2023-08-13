import React from "react";
import { useLocation } from "react-router-dom";

function Footer () {
  let currentUrl = useLocation();
  return (
    <>
      {
        currentUrl.pathname !== "/signin" && currentUrl.pathname !== "/signup" && currentUrl.pathname !== "/profile" && currentUrl.pathname !== "/404" ?
        (
          <footer className="footer">
            <p className="footer__project">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <p className="footer__copyright">&copy; 2023</p>
            <ul className="footer__partners">
              <li className="footer__partner"><a className="footer__link" rel="noreferrer" href="https://practicum.yandex.ru" target="_blank">Яндекс.Практикум</a></li>
              <li className="footer__partner"><a className="footer__link" rel="noreferrer" href="https://github.com" target="_blank">Github</a></li>
            </ul>
          </footer>
        ) : ""
      }
    </>
  )
}

export default Footer;
