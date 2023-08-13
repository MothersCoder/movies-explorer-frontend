function Portfolio () {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__works">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://yandex.ru" rel="noreferrer" target="_blank">
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://google.com" rel="noreferrer" target="_blank">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__arrow">↗</p>
          </a>

        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://lenta.ru" rel="noreferrer" target="_blank">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
