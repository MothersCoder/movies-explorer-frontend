import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound () {
  let navigate = useNavigate()

  return (
    <main className="main">
      <section className="not-found">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button
          className="not-found__link"
          onClick={() => navigate(-1) || navigate('/')}
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
