import { useLocation } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function SearchForm (props) {
  const formInputs = useFormAndValidation({
    searchWords: props.searchQuery ? props.searchQuery : '',
  })
  let currentUrl = useLocation();

  const searchList = () => {
    return currentUrl.pathname === '/saved-movies' ? props.likedCards : props.searchedMovies
  }

  function handleClick (e) {
    e.preventDefault();
    props.onSubmit(formInputs.values.searchWords);
  }

  return (
    <section className="search-form">
      <form className="search-form__form">
        <input className="search-form__input" name="searchWords" value={formInputs.values.searchWords} onChange={formInputs.handleChange} placeholder="Фильм"/>
        <input className="search-form__submit" onClick={handleClick}/>
      </form>
      <p className="search-form__err">{searchList() === undefined ? 'По вашему запросу ничего не найдено :( Попробуйте уточнить запрос и повторить поиск' : props.queryError ? 'Введите название фильма, ну или хотя бы его фрагмент' : ''}</p>
    </section>
  )
}

export default SearchForm;
