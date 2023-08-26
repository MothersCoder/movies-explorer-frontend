function FilterCheckbox (props) {

  function handleCheck () {
    props.onChecked(props.movieList);
  }

  return (
    <section className="filter">
        <input className="checkbox" type="checkbox" onChange={handleCheck} checked={props.checkedStatus}/>
      <p className="filter__text">Короткометражки</p>
    </section>
  )
}

export default FilterCheckbox;
