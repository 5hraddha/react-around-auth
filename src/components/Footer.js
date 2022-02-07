import React from 'react';

/**
 * The **Footer** component representing the footer of the webpage
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {new Date().getFullYear()} Around The U.S.</p>
    </footer>
  );
}

export default Footer;
