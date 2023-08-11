function AboutProject () {
  return (
    <section className="about-project">
      <a name="about"></a>
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__description">
        <div className="about-project__description-item">
          <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__description-item">
          <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <figure className="about-project__timeline">
        <p className="about-project__firststep">1 неделя</p>
        <p className="about-project__secondstep">4 недели</p>
        <figcaption className="about-project__caption">
          <p className="about-project__firstcaption">Back-end</p>
          <p className="about-project__secondcaption">Front-end</p>
        </figcaption>
      </figure>
    </section>
  )
}
export default AboutProject;
