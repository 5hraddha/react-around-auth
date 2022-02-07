import React                    from 'react';
import PropTypes                from 'prop-types';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import PopupWithForm            from './PopupWithForm';

/**
 * The **AddPlacePopup** component representing a popup with a form to add a new place
 *
 * @version 1.0.1
 * @author [Shraddha](https://github.com/5hraddha)
 */
function AddPlacePopup(props){
  const {isOpen, isDataLoading, onClose, onAddPlace}  = props;
  const {values, isValid, errors, handleChange, resetForm} = useFormAndValidation(['name', 'link']);

  // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialValues = {
      name: '',
      link: '',
    };
    resetForm({...initialValues}, {...initialValues}, true);
  }, [isOpen, resetForm]);

  const handleInputChange = (e) => handleChange(e);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const {name, link} = values;
    if(isValid || (name && link)){
      onAddPlace(name, link);
    }
  }

  const placeInputClassName = `popup__input ${(!isValid && errors.name) && `popup__input_type_error`}`;
  const placeInputErrorClassName = `popup__error ${(!isValid && errors.name) && `popup__error_visible`}`;
  const linkInputClassName = `popup__input ${(!isValid && errors.link) && `popup__input_type_error`}`;
  const linkInputErrorClassName = `popup__error ${(!isValid && errors.link) && `popup__error_visible`}`;

  return (
    <PopupWithForm
      name="place"
      title="New Place"
      btnLabel={(isDataLoading) ? 'Creating': 'Create'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}>

        <input
          className={placeInputClassName}
          type="text"
          id="place-input"
          name="name"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleInputChange}
          required />
        <span id="place-input-error" className={placeInputErrorClassName}>
          {errors.name}
        </span>

        <input
          className={linkInputClassName}
          type="url"
          id="link-input"
          name="link"
          placeholder="Image link"
          value={values.link}
          onChange={handleInputChange}
          required />
        <span id="link-input-error" className={linkInputErrorClassName}>
          {errors.link}
        </span>

    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  /** A boolean indicating if the popup is open or closed */
  isOpen          : PropTypes.bool.isRequired,
  /** A boolean indicating if the data is getting processed and loaded */
  isDataLoading   : PropTypes.bool.isRequired,
  /** A *callback function* that handles closing of the popup */
  onClose         : PropTypes.func.isRequired,
  /** A *callback function* that submits the `POST` request to the API for adding a new place  */
  onAddPlace      : PropTypes.func.isRequired,
}

export default AddPlacePopup;
