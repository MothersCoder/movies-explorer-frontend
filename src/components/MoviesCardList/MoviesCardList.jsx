import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList (props) {
  let currentUrl = useLocation()
  return (
    <section className="card-list">
      <ul className={`card-list__list ${currentUrl.pathname === "/saved-movies" ? "card-list__list_saved" : ""}`}>
        {(props.cards).map((card) => (
          <MoviesCard data={card} key={card._id}/>
        ))}
      </ul>
      <button className={`card-list__more-button ${currentUrl.pathname === "/saved-movies" ? "card-list__more-button_hide" : ""}`}>Ещё</button>
    </section>
  )
}

export default MoviesCardList;
