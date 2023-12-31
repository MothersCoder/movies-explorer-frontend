import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SavedMovies (props) {
  return (
    <main className="main">
      <section className="saved-movies">
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList
          cards={props.likedCards}
        />
      </section>
    </main>
  )
}

export default SavedMovies;
