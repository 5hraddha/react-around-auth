import React        from 'react';
import PropTypes    from 'prop-types';
import {Link}       from 'react-router-dom';
import Hamburger    from './Hamburger';
import pageLogo     from '../images/logo.svg';

/**
 * The **Header** component representing the header of the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Header(props) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const headerClassName = `${(isMenuOpen && windowWidth <= 550) ? `header header_menu-open` : `header`}`;

  React.useEffect(() => {
    let timeoutId = null;
    const handleWindowResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  });

  const setHeaderContent = () => {
    if(!props.isLoggedIn) {
      const { linkPath, linkText } = props;
      return (
        <nav className="header__menu">
          <Link className="header__link" to={linkPath}>
            {linkText}
          </Link>
        </nav>
      );
    }

    if(props.isLoggedIn && windowWidth > 550) {
      const { linkText, userEmail, onLogOut } = props;
      return (
        <nav className="header__menu">
          <ul className="header__menu-list">
            <li>
              <p className="header__text">{userEmail}</p>
            </li>
            <li>
              <button className="header__button" onClick={onLogOut}>
                {linkText}
              </button>
            </li>
          </ul>
        </nav>
      );
    }

    return <Hamburger setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} {...props} />;
  }

  return (
    <header className={headerClassName}>
      <img className="logo" src={pageLogo} alt="logo of the webpage having text around the US" />
      <div className="header__content">
        {setHeaderContent()}
      </div>
    </header>
  );
}

Header.propTypes = {
  /** A React component state tracking if the a user has been logged in */
  isLoggedIn                  : PropTypes.bool.isRequired,
  /** A React component state `isMenuOpen` setter callback to track the state of the menu */
  setIsMenuOpen               : PropTypes.func,
  /** A React component state representing the state of the menu */
  isMenuOpen                  : PropTypes.bool,
  /** A string representing the menu link path */
  linkPath                    : PropTypes.string,
  /** A string representing the menu link label */
  linkText                    : PropTypes.string.isRequired,
  /** A string representing the email of the current logged in user */
  userEmail                   : PropTypes.string,
  /** A *callback function* that user logout */
  onLogOut                    : PropTypes.func,
}

export default Header;
