import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";

function SavedMovies (props) {
  return (
    <main className="main">
      <section className="saved-movies">
        <SearchForm
          onSubmit={props.onSubmit}
          searchQuery={props.searchQuery}
          searchedMovies={props.searchedMovies}
          queryError={props.queryError}
          likedCards={props.likedCards}
        />
        <FilterCheckbox
          onChecked={props.onChecked}
          checkedStatus={props.status}
          movieList={props.likedCards}
        />
        {props.isLoading ? <Preloader /> : ""}
        <MoviesCardList
          movies={props.likedCards}
          checkedStatus={props.status}
          delete={props.delete}
          sortMovies={props.sortMovies}
          searchedMovies={props.searchedMovies}
        />
      </section>
    </main>
  );
}

export default SavedMovies;
