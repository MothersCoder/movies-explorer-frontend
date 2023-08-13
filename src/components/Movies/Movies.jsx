import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function Movies (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <div className="main">
      <section className="movies">
        {isLoaded ? <Preloader /> : ""}
        <SearchForm />
        <FilterCheckbox />
        <MoviesCardList
          cards={props.allCards}
        />
      </section>
    </div>
  )
}

export default Movies;
