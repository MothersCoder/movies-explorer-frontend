import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies (props) {
  return (
    <div className="saved-movies">
      <div className="saved-movies__header">
        <Header
          loggedIn={props.loggedIn}
        />
      </div>
      <SearchForm />
      <MoviesCardList
        cards={props.likedCards}
      />
    </div>
  )
}

export default SavedMovies;
