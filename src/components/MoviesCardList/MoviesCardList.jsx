import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList (props) {
  let currentUrl = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [filmQuantityLoad, setFilmQuantityLoad] = useState('');

  const checkData = (arg) => {
    if (arg) {
      return arg
    } else {
      return []
    }
  }

  const filmList = props.checkedStatus ? checkData(props.sortMovies) : props.movies;

  useEffect(() => {
    const windowListener = () => {
      setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    }

    window.addEventListener('resize', windowListener)
    return() => {
      window.removeEventListener('resize', windowListener);
    };
  }, [])

  useEffect(() => {
    getInitCount(windowWidth);
  }, [windowWidth])

  function loadStep (windowWidth) {
    return windowWidth >= '1280' ? 3 : 2;
  }

  function getInitCount (windowWidth) {
    return windowWidth >= '1280' ?  setFilmQuantityLoad(12) : windowWidth > '480' ? setFilmQuantityLoad(8) : windowWidth >= '320' &&  windowWidth <= '480' ? setFilmQuantityLoad(5) : setFilmQuantityLoad(5);
  }

  function handleMoreClick () {
    setFilmQuantityLoad(filmQuantityLoad + loadStep(windowWidth));
  }

  function render () {
    return (
      filmList !== null && filmList !== undefined ?
      filmList.slice(0, filmQuantityLoad).map((card) => (
        <MoviesCard data={card} key={card.id || card._id} like={props.like} delete={props.delete} likedCards={props.likedCards} allMovies={props.searchedMovies}/>
      ))
      : ''
    )
  }

  function hide () {
    return (
      filmList === null || filmList === undefined ?
      "card-list__more-button_hide" :
      filmList.length <= filmQuantityLoad ? "card-list__more-button_hide" : ""
    )
  }

  return (
    <section className="card-list">
      {props.getMoviesError ?
        <p className="card-list__error">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p> : ''
      }
      <ul className={`card-list__list ${currentUrl.pathname === "/saved-movies" ? "card-list__list_saved" : ""}`}>
        {render()}
      </ul>
      <button className={`card-list__more-button ${hide()} ${currentUrl.pathname === "/saved-movies" ? "card-list__more-button_hide" : ""}`} onClick={handleMoreClick}>Ещё</button>
    </section>
  )
}

export default MoviesCardList;
