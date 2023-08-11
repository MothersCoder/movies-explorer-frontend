import userPhoto from '../../../images/user-foto.png';

function AboutMe () {
  return (
    <section className="about-me">
      <a name="student"></a>
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__profile">
        <div className="about-me__profile-info">
          <h3 className="about-me__profile-title">Виталий</h3>
          <p className="about-me__profile-subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__profile-text">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и ушёл с&nbsp;постоянной работы.</p>
          <a className="about-me__profile-link" href="https://github.com/MothersCoder/movies-explorer-frontend" target="_blank">Github</a>
        </div>
        <img className="about-me__profile-img" src={userPhoto} alt="Фотография автора страницы"/>
      </div>
    </section>
  )
}

export default AboutMe;
