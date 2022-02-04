import React                from 'react';
import {Switch, Route}      from 'react-router-dom';
import Header               from './Header';
import Main                 from './Main';
import ImagePopup           from './ImagePopup';
import EditProfilePopup     from './EditProfilePopup';
import EditAvatarPopup      from './EditAvatarPopup';
import AddPlacePopup        from './AddPlacePopup';
import DeletePlacePopup     from './DeletePlacePopup';
import Footer               from './Footer';
import ProtectedRoute       from './ProtectedRoute';
import api                  from '../utils/api';
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
  const [isDataLoading, setIsDataLoading]                     = React.useState(false);
  const [selectedCard, setSelectedCard]                       = React.useState(null);
  const [selectedToDeleteCard, setSelectedToDeleteCard]       = React.useState(null);
  const [currentUser, setCurrentUser]                         = React.useState({});
  const [cards, setCards]                                     = React.useState([]);
  const [isLoggedIn, setIsLoggedIn]                           = React.useState(false);

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

    if(isEditProfilePopupOpen
      || isEditAvatarPopupOpen
      || isAddPlacePopupOpen
      || isPreviewPlacePopupOpen
      || isDeletePlacePopupOpen){
        document.addEventListener("click", handleClickClose);
        document.addEventListener("keydown", handleEscClose);
      }

    return () => {
      document.removeEventListener("click", handleClickClose);
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    isPreviewPlacePopupOpen,
    isDeletePlacePopupOpen] );

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPreviewPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedCard(null);
    setSelectedToDeleteCard(null);
  }

// ********************************************************************************************* //
//                      Handle all the user events on the web page                               //
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
          console.log("Uh-oh! Error occurred while changing the like status of the card.");
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
          console.log("Uh-oh! Error occurred while deleting the selected card from the server.");
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
        console.log("Uh-oh! Error occurred while updating the user data to the server.");
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
        console.log("Uh-oh! Error occurred while updating the user avatar to the server.");
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
        console.log("Uh-oh! Error occurred while adding a new card to the server.");
        console.log(err);
      })
      .finally(() => setIsDataLoading(false));
  }

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

// ********************************************************************************************* //
//                       Return different views of the application                               //
// ********************************************************************************************* //
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__wrapper">
          <Header />
          <div className="content">
            <Switch>
              <ProtectedRoute exact path="/" isLoggedIn={isLoggedIn}>
                <Main {...propsForMain} />
                <EditAvatarPopup {...propsForEditAvatarPopup} />
                <EditProfilePopup {...propsForEditProfilePopup} />
                <AddPlacePopup {...propsForAddPlacePopup} />
                <ImagePopup {...propsForImagePopup} />
                <DeletePlacePopup {...propsForDeletePlacePopup} />
              </ProtectedRoute>
            </Switch>
          </div>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;