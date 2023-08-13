import { Link } from "react-router-dom";

function NotFound () {
  return (
    <main className="main">
      <section className="not-found">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link className="not-found__link" to="/">Назад</Link>
      </section>
    </main>
  )
}

export default NotFound;
