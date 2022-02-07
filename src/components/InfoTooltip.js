import React              from 'react';
import PropTypes          from 'prop-types';
import registerSuccess    from '../images/register-success.svg';
import registerFailure    from '../images/register-failure.svg';

/**
 * The **InfoTooltip** component representing a popup to tell the status of user registration
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function InfoTooltip(props){
  const {
    name,
    isOpen,
    isSuccess,
    onClose,
  } = props;

  const tooltipImg = `${(isSuccess) ? registerSuccess : registerFailure}`;
  const tooltipMsg = `${(isSuccess)
    ? `Success! You have now been registered.`
    : `Oops, something went wrong! Please try again.`}`;

  return (
    <div className={`popup popup_rel_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="popup__tooltip-img" src={tooltipImg} alt="Tooltip icon" />
        <p className="popup__tooltip-msg">{tooltipMsg}</p>
        <button
          className="popup__tooltip-close-btn"
          type="button"
          aria-label="Close popup"
          onClick={onClose}>
        </button>
      </div>
    </div>
  );
}

InfoTooltip.propTypes = {
  /** A string representing the **name of the popup** */
  name            : PropTypes.string.isRequired,
  /** A boolean indicating if the popup is open or closed */
  isOpen          : PropTypes.bool.isRequired,
  /** A boolean indicating if the user registration was successful or not */
  isSuccess       : PropTypes.bool.isRequired,
  /** A *callback function* that handles closing of the popup */
  onClose         : PropTypes.func.isRequired,
}

export default InfoTooltip;
