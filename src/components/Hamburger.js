import React          from 'react';
import PropTypes      from 'prop-types';

/**
 * The **Hamburger** component representing the hamburger and its menu.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Hamburger(props){
  const {
    setIsMenuOpen,
    isMenuOpen,
    linkText,
    userEmail,
    onLogOut,
  } = props;

  const handleHamburgerIconClick = () => setIsMenuOpen(!isMenuOpen);
  const handleNavClick = () => setIsMenuOpen(false);
  const buttonClassName = `${(isMenuOpen) ? `hamburger__button hamburger__button_close` : `hamburger__button`}`;
  const menuClassName = `${(isMenuOpen) ? `hamburger__menu hamburger__menu_visible` : `hamburger__menu`}`;

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  return (
    <div className="hamburger">
      <button
        className={buttonClassName}
        type="button"
        aria-label="Hamburger Button"
        onClick={handleHamburgerIconClick}>
      </button>
      <nav className={menuClassName} onClick={handleNavClick}>
        <ul className="hamburger__menu-list">
          <li className="hamburger__menu-list-item">
            <p className="hamburger__text">{userEmail}</p>
          </li>
          <li className="hamburger__menu-list-item">
            <button className="hamburger__logout-button" onClick={onLogOut}>
              {linkText}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Hamburger.propTypes = {
  /** A React component state `isMenuOpen` setter callback to track the state of the menu */
  setIsMenuOpen               : PropTypes.func.isRequired,
  /** A React component state representing the state of the menu */
  isMenuOpen                  : PropTypes.bool.isRequired,
  /** A string representing the logout button label */
  linkText                    : PropTypes.string.isRequired,
  /** A string representing the email of the current logged in user */
  userEmail                   : PropTypes.string,
  /** A *callback function* that user logout */
  onLogOut                    : PropTypes.func,
}

export default Hamburger;
