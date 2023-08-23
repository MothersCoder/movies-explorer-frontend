import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard (props) {
  const currentUrl = useLocation();
  const [isLiked, setLike] = useState(false);
  const [id, setId] = useState();

  const duration = props.data.duration;
  const minute = duration % 60;
  const hour = (duration - minute) / 60;

  useEffect(() => {
    likeCheck();
  }, [props.allMovies, props.likedCards])

  function onLikeClick () {
    if(isLiked) {
      setLike(false);
      props.delete(id)
    } else {
      setLike(true);
      props.like(props.data);
    }
  }

  function likeCheck () {
    if(props.likedCards) {
      let likedMove = props.likedCards.filter((movie) => movie.nameRU === props.data.nameRU);
      if(likedMove.length !== 0) {
        setLike(true);
        setId(likedMove[0]._id)
      }
    }};


  function onDeleteClick () {
    props.delete(props.data._id);
  }

  return (
    <li className="card-list__card" key={props.data.id || props.data._id}>
      <a className="card-list__card-link" href={props.data.trailerLink} rel="noreferrer" target="_blank"><img className="card-list__card-img" alt={props.data.nameRU} src={currentUrl.pathname === '/saved-movies' ? props.data.image : `https://api.nomoreparties.co${props.data.image.url}`} /></a>
      <h2 className="card-list__card-title">{props.data.nameRU}</h2>
      {
        currentUrl.pathname === "/saved-movies" ? (
          <button type="button" className="card-list__card-delete" onClick={onDeleteClick}></button>
        ) : (
        <button type="button" className={`card-list__card-like ${isLiked ? 'card-list__card-like_active' : ''}`} onClick={onLikeClick}></button>
        )
      }

      <p className="card-list__card-duration">{hour}ч {minute}м</p>
    </li>
  )
}

export default MoviesCard;

