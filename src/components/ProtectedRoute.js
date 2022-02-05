import React              from 'react';
import PropTypes          from 'prop-types';
import {Route, Redirect}  from 'react-router-dom';

/**
 * The **ProtectedRoute* component representing a route accessible to only logged in users
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function ProtectedRoute({children, isLoggedIn, ...restProps}) {
  return (
    <Route {...restProps}>
      {
        isLoggedIn
        ? children
        : <Redirect to="/login" />
      }
    </Route>
  );
}

ProtectedRoute.propTypes = {
  /** Any HTML or React Component that are children of ProtectedRoute component */
  children: PropTypes.any.isRequired,
  /** A boolean indicating if the user is logged in or not */
  isLoggedIn: PropTypes.bool.isRequired,
  /** An object containing the remaining props passed to ProtectedRoute component */
  restProps: PropTypes.object,
}

export default ProtectedRoute;
