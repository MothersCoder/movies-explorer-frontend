import '../../index.css';
import React from 'react';
import {useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoutElement from '../ProtectedRoute/ProtectedRout';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';
import { movie } from '../../utils/MoviesApi';
import Main from '../landing/Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(null);
  const [confirm, setConfirm] = useState(false)

  const [regError, setRegError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const [getUserDataError, setGetUserDataError] = useState(null);
  const [changeUserDataError, setChangeUserDataError] = useState(null);

  const [getMoviesError, setGetMoviesError] = useState(null);

  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [isFilterActive, setFilterActive] = useState(false);
  const [sortMovies, setSortMovies] = useState([]);

  const [isLikeFilterActive, setLikeFilterActive] = useState(false);
  const [sortLikeMovies, setSortLikeMovies] = useState([]);

  const [likedMovies, setLikedMovies] = useState([]);
  const [getLikedMoviesErr, setGetLikedMoviesErr] = useState();

  const [queryError, setQueryError] = useState(false);
  const [queryErrorLike, setQueryErrorLike] = useState(false);

  const storageConstants = {
    searchQuery: localStorage.getItem('searchQuery'),
    movies: (JSON.parse(localStorage.getItem('allMovies'))),
    searchedMovies: (JSON.parse(localStorage.getItem('searchedMovies'))),
    filterActive: (JSON.parse(localStorage.getItem('filterStatus'))),
    sortMovies: (JSON.parse(localStorage.getItem('sortedMovies'))),
    likedMovies: (JSON.parse(localStorage.getItem('likedMovies')))
  }

  const login = (email, password) => {
    api
      .login(email, password)
      .then ((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies', {replace: true});
      })
      .catch((err) => setLoginError(err))
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if(loggedIn) {
      getMovies();
    }
  }, [loggedIn]);

  useEffect(() => {
    setSearchQuery(storageConstants.searchQuery);
    setSearchedMovies(storageConstants.searchedMovies);
    setFilterActive(storageConstants.filterActive);
    setSortMovies(storageConstants.sortMovies);
    setLikedMovies(JSON.parse(localStorage.getItem('like')));
  }, []);

  useEffect(() => {
    getLikedFilms();
  }, [])

  function handleSignUpClick (e, data) {
    e.preventDefault();
    api
      .register(data.name, data.email, data.password)
      .then(() => {
        login(data.email, data.password);
      })
      .catch((err) => setRegError(err))
  }

  function getMovies () {
    setIsLoading(true)
    movie
      .getMovies()
      .then((movies) => {
        localStorage.setItem('allMovies', JSON.stringify(movies));
        setMovies(storageConstants.movies);
      })
      .finally(() => setIsLoading(false))
      .catch((err) => setGetMoviesError(err))
  }

  function getLikedFilms () {
    setIsLoading(true);
    api
      .getLikedFilms ()
      .then((likeMovies) => {
        const userList = likeMovies.filter((card) => card.owner === currentUser._id);
        setLikedMovies(userList);
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        setGetLikedMoviesErr(err);
        console.log(getLikedMoviesErr);
      })
  }

  function tokenCheck () {
    api
      .getUserData()
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setCurrentUser(res);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setGetUserDataError(err);
        console.log(getUserDataError);
        setLoggedIn(false);
      })
  }

  function handleSignInClick (e, data) {
    e.preventDefault();
    const { email, password } = data;
    login(email, password);
  }

  function handleSignOutClick () {
    api
      .logout()
      .then(() => {
        navigate('/', {replase: true});
        localStorage.clear();
        setLoggedIn(false);
      })
      .catch((err) => console.log(err))
  }

  function handleChangeUserDataClick (e, inputs) {
    e.preventDefault();
    setConfirm(false)
    api
      .changeUserData(inputs.name , inputs.email)
      .then(() => {
        tokenCheck();
      })
      .finally(() => setConfirm(true))
      .catch((err) => setChangeUserDataError(err));
  }

  function handleGetMoviesClick (searchQuery) {
    if (searchQuery === '') {
      setQueryError(true);
      setSearchedMovies([]);
      return
    }
    setQueryError(false)
    const filter = storageConstants.movies.filter(function (movie) {
      return (
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    localStorage.setItem('searchedMovies', JSON.stringify(filter));
    localStorage.setItem('searchQuery', searchQuery);

    if (filter.length > 0) {
      setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
    } else {
      setSearchedMovies(undefined);
      return
    }
  }

  function handleGetLikedMoviesClick (searchQuery) {
    if (searchQuery === '' || likedMovies === '') {
      setQueryErrorLike(true);
      setLikedMovies([]);
      return
    }

    setQueryErrorLike(false)
    const filter = likedMovies.filter(function (movie) {
      return (
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    localStorage.setItem('searchedMoviesLike', JSON.stringify(filter));
    localStorage.setItem('searchQueryLike', searchQuery);

    if (filter.length > 0) {
      setLikedMovies(
        JSON.parse(localStorage.getItem('searchedMoviesLike'))
      );
    } else {
      setLikedMovies(undefined);
      return
    }
  }

  function filterActiveToggle (movieList) {
    if (!isFilterActive) {
      setFilterActive(true);
      localStorage.setItem('filterStatus', !isFilterActive);

      if(searchedMovies === null) {
        return
      }

      if(movieList.length > 0) {
        const sort = movieList.filter(function (movie) {
          return movie.duration <= 40
        });

        localStorage.setItem('sortedMovies', JSON.stringify(sort));

        if (sort.length > 0) {
          setSortMovies(
            JSON.parse(localStorage.getItem('sortedMovies'))
          );
        } else {
          setSortMovies([]);
        }
      }
    } else {
      setFilterActive(false);
      localStorage.setItem('filterStatus', !isFilterActive);
    }
  }

  function filterLikeActiveToggle (movieList) {
    if (!isLikeFilterActive) {
      setLikeFilterActive(true);
      localStorage.setItem('filterLikeStatus', !isFilterActive);

      if(likedMovies === null) {
        return
      }

      if(movieList.length > 0) {
        const sort = movieList.filter(function (movie) {
          return movie.duration <= 40
        });

        localStorage.setItem('sortedLikeMovies', JSON.stringify(sort));

        if (sort.length > 0) {
          setSortLikeMovies(
            JSON.parse(localStorage.getItem('sortedLikeMovies'))
          );
        } else {
          setSortLikeMovies([]);
        }
      }
    } else {
      setLikeFilterActive(false);
      localStorage.setItem('filterLikeStatus', !isFilterActive);
    }
  }

  function handleLikeClick (card) {
    api
      .likeFilm(card)
      .then((res) => {
        card._id = res._id;
        return api.getLikedFilms()
      })
      .then((newCards) => {
        const userList = newCards.filter((card) => card.owner === currentUser._id);
        localStorage.setItem('like', JSON.stringify(userList));
        setLikedMovies(JSON.parse(localStorage.getItem('like')));
      })
      .catch((err) => console.log(err))
  }

  function handleDeleteLikeClick (cardId) {
    api
      .deleteLikedFilm(cardId)
      .then(() => {
        return api.getLikedFilms();
      })
      .then((fullList) => {
        const newList = fullList.filter((card) => card._id !== cardId);
        setLikedMovies(newList);
      })
      .catch((err) => {
        setLikedMovies([]);
        console.log(err);
      })
  }

  function clearConfirm () {
    setConfirm(false)
  }

  if (loggedIn === null) {
    return (
      <div className="main">
          <h2
            style={{
              color: "grey",
              textAlign: 'center',
          }}>
            Loading...
          </h2>
      </div>
    )
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header loggedIn={loggedIn} />
          <Routes>

            <Route path="/" element={ <Main loggedIn={loggedIn} /> } />

            <Route
              path="/movies"
              element={
                <ProtectedRoutElement
                  element={Movies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}

                  allCards={movies}
                  movies={movies}

                  onSubmit={handleGetMoviesClick}

                  searchedMovies={searchedMovies}
                  searchQuery={searchQuery}
                  getMoviesError={getMoviesError}
                  onChecked={filterActiveToggle}
                  status={isFilterActive}
                  sortMovies={sortMovies}
                  like={handleLikeClick}
                  delete={handleDeleteLikeClick}
                  queryError={queryError}

                  likedCards={likedMovies}
                />
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoutElement
                  element={SavedMovies}
                  isLoading={isLoading}
                  loggedIn={loggedIn}
                  likedCards={likedMovies}
                  delete={handleDeleteLikeClick}
                  onSubmit={handleGetLikedMoviesClick}
                  queryError={queryErrorLike}
                  onChecked={filterLikeActiveToggle}
                  status={isLikeFilterActive}
                  sortMovies={sortLikeMovies}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoutElement
                  element={Profile}
                  loggedIn={loggedIn}
                  user={currentUser}
                  updateUserData={handleChangeUserDataClick}
                  serverError={changeUserDataError}
                  logout={handleSignOutClick}
                  confirm={confirm}
                  clearConfirm={clearConfirm}
                />
              }
            />

            <Route
              path="/signup"
              element={
                <Register
                  onSubmit={handleSignUpClick}
                  error={regError}
                />
              }
            />

            <Route
              path="/signin"
              element={
                <Login
                  onSubmit={handleSignInClick}
                  error={loginError}
                />
              }
            />

            <Route path="/404" element={ <NotFound /> } />

            <Route path="/*" element={ <Navigate to="/404" replace/> } />
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
