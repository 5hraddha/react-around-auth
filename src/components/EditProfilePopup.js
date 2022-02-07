import React                    from 'react';
import PropTypes                from 'prop-types';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import PopupWithForm            from './PopupWithForm';
import CurrentUserContext       from '../contexts/CurrentUserContext';

/**
 * The **EditProfilePopup** component representing a popup with a form to update the current user data
 *
 * @version 1.0.1
 * @author [Shraddha](https://github.com/5hraddha)
 */
function EditProfilePopup(props) {
  const {isOpen, isDataLoading, onClose, onUpdateUser}        = props;
  const {values, isValid, errors, handleChange, resetForm}    = useFormAndValidation(['title', 'subtitle']);
  const currentUser                                           = React.useContext(CurrentUserContext);

  // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialInputValues = {
      title: currentUser.name || '',
      subtitle: currentUser.about || '',
    };
    const initialErrorValues = {
      title: '',
      subtitle: '',
    }
    resetForm({...initialInputValues}, {...initialErrorValues}, true);
  }, [isOpen, resetForm, currentUser]);

  const handleInputChange = (e) => handleChange(e);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const {title, subtitle} = values;
    if(isValid || (title && subtitle)){
      onUpdateUser({name: title, about: subtitle});
    }
  }

  const nameInputClassName = `popup__input ${(!isValid && errors.title) && `popup__input_type_error`}`;
  const nameInputErrorClassName = `popup__error ${(!isValid && errors.title) && `popup__error_visible`}`;
  const aboutInputClassName = `popup__input ${(!isValid && errors.subtitle) && `popup__input_type_error`}`;
  const aboutInputErrorClassName = `popup__error ${(!isValid && errors.subtitle) && `popup__error_visible`}`;

  return (
    <PopupWithForm
      name="profile"
      title="Edit profile"
      btnLabel={(isDataLoading) ? 'Saving': 'Save'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit} >

        <input
          className={nameInputClassName}
          type="text"
          id="name-input"
          name="title"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          onChange={handleInputChange}
          value={values.title}
          required />
        <span id="name-input-error" className={nameInputErrorClassName}>
          {errors.title}
        </span>

        <input
          className={aboutInputClassName}
          type="text"
          id="about-input"
          name="subtitle"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          onChange={handleInputChange}
          value={values.subtitle}
          required />
        <span id="about-input-error" className={aboutInputErrorClassName}>
          {errors.subtitle}
        </span>

    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  /** A boolean indicating if the popup is open or closed */
  isOpen          : PropTypes.bool.isRequired,
  /** A boolean indicating if the data is getting processed and loaded */
  isDataLoading   : PropTypes.bool.isRequired,
  /** A *callback function* that handles closing of the popup */
  onClose         : PropTypes.func.isRequired,
  /** A *callback function* that submits the `PATCH` request to the API for updating the current user data  */
  onUpdateUser    : PropTypes.func.isRequired,
}

export default EditProfilePopup;