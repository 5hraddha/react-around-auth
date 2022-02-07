import React                    from 'react';
import PropTypes                from 'prop-types';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import PopupWithForm            from './PopupWithForm';

/**
 * The **EditAvatarPopup** component representing a popup with a form to edit user avatar
 *
 * @version 1.0.1
 * @author [Shraddha](https://github.com/5hraddha)
 */
function EditAvatarPopup(props) {
  const {isOpen, isDataLoading, onClose, onUpdateAvatar}  = props;
  const {values, isValid, errors, handleChange, resetForm} = useFormAndValidation(['avatarlink']);

   // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialValues = {
      avatarlink: '',
    };
    resetForm({...initialValues}, {...initialValues}, true);
  }, [isOpen, resetForm]);

  const handleInputChange = (e) => handleChange(e);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { avatarlink } = values;
    if(isValid || avatarlink){
      onUpdateAvatar(avatarlink);
    }
  }

  const linkInputClassName = `popup__input ${(!isValid && errors.avatarlink) && `popup__input_type_error`}`;
  const linkInputErrorClassName = `popup__error ${(!isValid && errors.avatarlink) && `popup__error_visible`}`;

  return (
    <PopupWithForm
      name="avatar"
      title="Change Profile Picture"
      btnLabel={(isDataLoading) ? 'Saving': 'Save'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}>

        <input
          className={linkInputClassName}
          type="url"
          id="avatarlink-input"
          name="avatarlink"
          placeholder="Image link"
          value={values.avatarlink}
          onChange={handleInputChange}
          required />
        <span id="avatarlink-input-error" className={linkInputErrorClassName}>
          {errors.avatarlink}
        </span>

    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  /** A boolean indicating if the popup is open or closed */
  isOpen          : PropTypes.bool.isRequired,
  /** A boolean indicating if the data is getting processed and loaded */
  isDataLoading   : PropTypes.bool.isRequired,
  /** A *callback function* that handles closing of the popup */
  onClose         : PropTypes.func.isRequired,
  /** A *callback function* that submits the `PATCH` request to the API for updating the current user's avatar  */
  onUpdateAvatar  : PropTypes.func.isRequired,
}

export default EditAvatarPopup;