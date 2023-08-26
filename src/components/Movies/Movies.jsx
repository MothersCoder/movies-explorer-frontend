import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function Movies (props) {
  return (
    <main className="main">
      <section className="movies">
        <SearchForm
          onSubmit={props.onSubmit}
          searchQuery={props.searchQuery}
          searchedMovies={props.searchedMovies}
          queryError={props.queryError}
        />
        <FilterCheckbox
          onChecked={props.onChecked}
          checkedStatus={props.status}
          movieList={props.searchedMovies}
        />
        {props.isLoading ? <Preloader /> : ""}
        <MoviesCardList
          movies={props.searchedMovies}
          checkedStatus={props.status}
          sortMovies={props.sortMovies}
          like={props.like}
          delete={props.delete}
          likedCards={props.likedCards}
          getMoviesError={props.getMoviesError}
          searchedMovies={props.searchedMovies}
        />
      </section>
    </main>
  );
}

export default Movies;
