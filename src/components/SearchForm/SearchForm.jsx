import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm () {
  return (
    <>
      <section className="search-form">
        <input className="search-form__input" placeholder="Фильм"/>
        <input className="search-form__submit" />
      </section>
      <FilterCheckbox />
    </>
  )
}

export default SearchForm;
