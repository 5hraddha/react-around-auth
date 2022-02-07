import React                from 'react';
import
{
  Switch,
  Route,
  useHistory,
}                           from 'react-router-dom';
import Header               from './Header';
import Main                 from './Main';
import ImagePopup           from './ImagePopup';
import EditProfilePopup     from './EditProfilePopup';
import EditAvatarPopup      from './EditAvatarPopup';
import AddPlacePopup        from './AddPlacePopup';
import DeletePlacePopup     from './DeletePlacePopup';
import Register             from './Register';
import Login                from './Login';
import InfoTooltip          from './InfoTooltip';
import Footer               from './Footer';
import ProtectedRoute       from './ProtectedRoute';
import api                  from '../utils/api';
import auth                 from '../utils/auth';
import CurrentUserContext   from '../contexts/CurrentUserContext';

/**
 * The main React **App** component.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]   = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]     = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]         = React.useState(false);
  const [isPreviewPlacePopupOpen, setIsPreviewPlacePopupOpen] = React.useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen]   = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen]   = React.useState(false);
  const [userRegisterStatus, setUserRegisterStatus]           = React.useState(false);
  const [isDataLoading, setIsDataLoading]                     = React.useState(false);
  const [selectedCard, setSelectedCard]                       = React.useState(null);
  const [selectedToDeleteCard, setSelectedToDeleteCard]       = React.useState(null);
  const [cards, setCards]                                     = React.useState([]);
  const [currentUser, setCurrentUser]                         = React.useState({});
  const [currentUserEmail, setCurrentUserEmail]               = React.useState('');
  const [isLoggedIn, setIsLoggedIn]                           = React.useState(false);
  const [registerEmail, setRegisterEmail]                     = React.useState('');
  const [registerPassword, setRegisterPassword]               = React.useState('');
  const [loginEmail, setLoginEmail]                           = React.useState('');
  const [loginPassword, setLoginPassword]                     = React.useState('');
  const history                                               = useHistory();

// ********************************************************************************************* //
//                      Fetch initial cards & user data on page load                             //
// ********************************************************************************************* //
  React.useEffect(() => {
    api
      .getInitialCards()
        .then(setCards)
        .catch(err => {
          console.log("Uh-oh! Error occurred while fetching the existing cards from the server.");
          console.log(err);
        });
  }, []);

  React.useEffect(() => {
    api
      .getUserData()
      .then(res => setCurrentUser(res))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the current user data from the server.");
        console.log(err);
      });
  }, []);

// ********************************************************************************************* //
//                        Handle mouse click or Esc key down event                               //
// ********************************************************************************************* //
  const isAnyPopupOpen = (
    isEditProfilePopupOpen
    || isEditAvatarPopupOpen
    || isAddPlacePopupOpen
    || isPreviewPlacePopupOpen
    || isDeletePlacePopupOpen
    || isInfoTooltipPopupOpen);

  React.useEffect(() => {
    const handleClickClose = e => {
      if(e.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    const handleEscClose = e => {
      if(e.key === "Escape"){
        closeAllPopups();
      }
    }

    if(isAnyPopupOpen){
        document.addEventListener("click", handleClickClose);
        document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("click", handleClickClose);
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isAnyPopupOpen] );

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPreviewPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
    setSelectedToDeleteCard(null);
  }

// ********************************************************************************************* //
//                         Handle all the events on the web page                                 //
// ********************************************************************************************* //
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleCardClick = card => {
    setSelectedCard(card);
    setIsPreviewPlacePopupOpen(true);
  };

  const handleCardDeleteClick = card => {
    setSelectedToDeleteCard(card);
    setIsDeletePlacePopupOpen(true);
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
        .then(newCard =>
          setCards(state => state.map(c => c._id === card._id ? newCard : c)))
        .catch(err => {
          console.log('Uh-oh! Error occurred while changing the like status of the card.');
          console.log(err);
        });
  }

  const handleCardDeleteSubmit = card => {
    setIsDataLoading(true);
    api
      .deleteCard(card._id)
        .then(() => {
          setCards(state => state.filter(c => c._id !== card._id));
          closeAllPopups();
        })
        .catch(err => {
          console.log('Uh-oh! Error occurred while deleting the selected card from the server.');
          console.log(err);
        })
        .finally(() => setIsDataLoading(false));
  }

  const handleUpdateUser = userData => {
    setIsDataLoading(true);
    api
      .updateUserData(userData)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log('Uh-oh! Error occurred while updating the user data to the server.');
        console.log(err);
      })
      .finally(() => setIsDataLoading(false));
  }

  const handleUpdateAvatar = newAvatarUrl => {
    setIsDataLoading(true);
    api
      .updateUserAvatar(newAvatarUrl)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log('Uh-oh! Error occurred while updating the user avatar to the server.');
        console.log(err);
      })
      .finally(() => setIsDataLoading(false));
  }

  const handleAddPlaceSubmit = (cardName, cardImageLink) => {
    setIsDataLoading(true);
    api
      .addNewCard(cardName, cardImageLink)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log('Uh-oh! Error occurred while adding a new card to the server.');
        console.log(err);
      })
      .finally(() => setIsDataLoading(false));
  }

  const handleRegisterSubmit = () => {
    setIsDataLoading(true);
    auth
      .register(registerEmail, registerPassword)
      .then(() => {
        setUserRegisterStatus(true);
        history.push('/login');
      })
      .catch(err => {
        setUserRegisterStatus(false);
        console.log('Uh-oh! Error occurred while registering a new user.');
        if(err.status === 400){
          console.log('One of the fields was filled in incorrectly while user registration.');
        }
      })
      .finally(() => {
        setIsDataLoading(false);
        setIsInfoTooltipPopupOpen(true);
        // Close the InfoTooltip popup after 2 sec
        let timeoutId = null;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsInfoTooltipPopupOpen(false);
        }, 2000);
      });
  }

  const handleLoginSubmit = () => {
    setIsDataLoading(true);
    auth
      .login(loginEmail, loginPassword)
      .then(res => {
        if(!res.token){
          return;
        }
        localStorage.setItem('token', res.token);
        setCurrentUserEmail(loginEmail);
        setLoginEmail('');
        setLoginPassword('');
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch(err => {
        console.log('Uh-oh! Error occurred while logging in.');
        if(err.status === 400){
          console.log('One or more of the fields were not provided while logging in.');
        }
        if(err.status === 401){
          console.log('The user with the specified email not found.');
        }
      })
      .finally(() => setIsDataLoading(false));
  }

  const validateToken = React.useCallback(() => {
    const jwt = localStorage.getItem('token');
    if(jwt){
      auth
        .validateUserToken(jwt)
        .then(res => {
          if(!res){
            return;
          }
          setCurrentUserEmail(res.data.email);
          setIsLoggedIn(true);
          history.push('/');
        })
        .catch(err => {
          console.log('Uh-oh! Error occurred while validating token.');
          if(err.status === 400){
            console.log('Token not provided or provided in the wrong format.');
          }
          if(err.status === 401){
            console.log('The provided token is invalid.');
          }
        });
    }
  }, [history]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
    setIsLoggedIn(false);
    setCurrentUserEmail('');
  }

// ********************************************************************************************* //
//                                Validate user token on page load                               //
// ********************************************************************************************* //
  React.useEffect(() => {
    validateToken();
  }, [validateToken]);

// ********************************************************************************************* //
//                 Create props objects to pass to the React Components                          //
// ********************************************************************************************* //
  const propsForMain = {
    onEditProfileClick: handleEditProfileClick,
    onAddPlaceClick:    handleAddPlaceClick,
    onEditAvatarClick:  handleEditAvatarClick,
    onCardClick:        handleCardClick,
    onCardDeleteClick:  handleCardDeleteClick,
    onCardLike:         handleCardLike,
    cards,
  };

  const propsForEditAvatarPopup = {
    isOpen:         isEditAvatarPopupOpen,
    isDataLoading:  isDataLoading,
    onClose:        closeAllPopups,
    onUpdateAvatar: handleUpdateAvatar,
  };

  const propsForEditProfilePopup = {
    isOpen:         isEditProfilePopupOpen,
    isDataLoading:  isDataLoading,
    onClose:        closeAllPopups,
    onUpdateUser:   handleUpdateUser,
  };

  const propsForAddPlacePopup = {
    isOpen:         isAddPlacePopupOpen,
    isDataLoading:  isDataLoading,
    onClose:        closeAllPopups,
    onAddPlace:     handleAddPlaceSubmit,
  }

  const propsForImagePopup = {
    card:     selectedCard,
    onClose:  closeAllPopups,
  }

  const propsForDeletePlacePopup = {
    card:           selectedToDeleteCard,
    isOpen:         isDeletePlacePopupOpen,
    isDataLoading:  isDataLoading,
    onClose:        closeAllPopups,
    onCardDelete:   handleCardDeleteSubmit,
  }

  const propsForRegister = {
    isDataLoading,
    onSubmit: handleRegisterSubmit,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
  }

  const propsForLogin = {
    isDataLoading,
    onSubmit: handleLoginSubmit,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
  }

  const propsForHeaderRegister = {
    isLoggedIn,
    linkPath: '/login',
    linkText: 'Log in',
  }

  const propsForHeaderLogin = {
    isLoggedIn,
    linkPath: '/register',
    linkText: 'Sign up',
  }

  const propsForHeaderProtected = {
    isLoggedIn,
    linkText: 'Log out',
    userEmail: currentUserEmail,
    onLogOut: handleLogOut,
  }

  const propsForInfoTooltip = {
    name:         'tooltip',
    isOpen:       isInfoTooltipPopupOpen,
    isSuccess:    userRegisterStatus,
    onClose:      closeAllPopups,
  }

// ********************************************************************************************* //
//                       Return different views of the application                               //
// ********************************************************************************************* //
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <Switch>
            <Route path="/register">
              <Header {...propsForHeaderRegister} />
              <Register {...propsForRegister} />
            </Route>
            <Route path="/login">
              <Header {...propsForHeaderLogin} />
              <Login {...propsForLogin} />
            </Route>
            <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}>
              <Header {...propsForHeaderProtected} />
              <Main {...propsForMain} />
              <EditAvatarPopup {...propsForEditAvatarPopup} />
              <EditProfilePopup {...propsForEditProfilePopup} />
              <AddPlacePopup {...propsForAddPlacePopup} />
              <ImagePopup {...propsForImagePopup} />
              <DeletePlacePopup {...propsForDeletePlacePopup} />
              <Footer />
            </ProtectedRoute>
          </Switch>
          <InfoTooltip {...propsForInfoTooltip} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
