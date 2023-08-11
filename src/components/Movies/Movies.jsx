import { useState } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function Movies (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <>
    <div className="movies">
      <div className="movies__header">
        <Header
          loggedIn={props.loggedIn}
        />
      </div>
      <SearchForm />
      <MoviesCardList
        cards={props.allCards}
      />
    </div>

    {isLoaded ? <Preloader /> : null}
    </>
  )
}

export default Movies;
