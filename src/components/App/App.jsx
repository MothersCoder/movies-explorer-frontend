import '../../index.css';
import React from 'react';
import {useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../landing/Main/Main';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import { initialCards, likedCards } from '../../utils/constants';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [userData, setUserData] = useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru'
  })

  function handleEditClick (data) {
    setUserData({
      name: data.name,
      email: data.email
    });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Routes>
            <Route path="/" element={
              <Main
                loggedIn={loggedIn}
              />
              }
            />

            <Route path="/movies" element={
              <Movies
                loggedIn={loggedIn}
                allCards={initialCards}
              />
            } />

            <Route path="/saved-movies" element={
              <SavedMovies
                loggedIn={loggedIn}
                likedCards={likedCards}
              />
            } />

            <Route path="/profile" element={
              <Profile
                loggedIn={loggedIn}
                user={userData}
                updateUserData={handleEditClick}
              />
            }
            />

            <Route path="/signup" element={
              <Register />
            }
            />

            <Route path="/signin" element={
              <Login />
            }
            />

            <Route path="/404" element={
              <NotFound />
            }
            />

          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
