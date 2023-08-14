import { useLocation } from "react-router-dom";

function MoviesCard (props) {
  const currentUrl = useLocation()
  return (
    <li className="card-list__card" key={props.data._id}>
      <img className="card-list__card-img" alt={props.data.title} src={props.data.img} />
      <h2 className="card-list__card-title">{props.data.title}</h2>
      {
        currentUrl.pathname === "/saved-movies" ? (
          <button type="button" className="card-list__card-delete"></button>
        ) : (
        <button type="button" className="card-list__card-like"></button>
        )
      }

      <p className="card-list__card-duration">{props.data.duration}</p>
    </li>
  )
}

export default MoviesCard;

