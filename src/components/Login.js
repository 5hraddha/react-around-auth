import React                from 'react';
import PropTypes            from 'prop-types';
import Form                 from './Form';

/**
 * The **Login** component representing user authorization or login form.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Login(props){
  const {
    isDataLoading,
    onSubmit,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
  }  = props;
  const [isLoginEmailValid, setIsLoginEmailValid]                 = React.useState(true);
  const [isLoginPasswordValid, setIsLoginPasswordValid]           = React.useState(true);
  const [loginEmailErrorMessage, setLoginEmailErrorMessage]       = React.useState('');
  const [loginPasswordErrorMessage, setLoginPasswordErrorMessage] = React.useState('');

  const emailInputClassName = `form__input ${(!isLoginEmailValid) && `form__input_type_error`}`;
  const emailErrorClassName = `form__error ${(!isLoginEmailValid) && `form__error_visible`}`;
  const passwordInputClassName = `form__input ${(!isLoginPasswordValid) && `form__input_type_error`}`;
  const passwordErrorClassName = `form__error ${(!isLoginPasswordValid) && `form__error_visible`}`;

  React.useEffect(() => {
    setIsLoginEmailValid(true);
    setIsLoginPasswordValid(true);
    setLoginEmailErrorMessage('');
    setLoginPasswordErrorMessage('');
  }, []);

  const handleInputChange = e => {
    const {name, value, validity, validationMessage} = e.target;
    switch (name) {
      case 'login-email' : {
        setLoginEmail(value);
        setIsLoginEmailValid(validity.valid);
        (!validity.valid) && setLoginEmailErrorMessage(validationMessage);
        break;
      }
      case 'login-password': {
        setLoginPassword(value);
        setIsLoginPasswordValid(validity.valid);
        (!validity.valid) && setLoginPasswordErrorMessage(validationMessage);
        break;
      }
      default: break;
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({loginEmail, loginPassword});
  }

  return (
    <section className='auth-form'>
      <Form
        name="login"
        title="Log in"
        btnLabel={(isDataLoading) ? 'Logging in': 'Log in'}
        linkPath="/register"
        linkText="Not a member yet? Sign up here!"
        onSubmit={handleSubmit}>

        <input
          className={emailInputClassName}
          type="email"
          id="login-email"
          name="login-email"
          placeholder="Email"
          value={loginEmail}
          onChange={handleInputChange}
          required />
        <span id="login-email-error" className={emailErrorClassName}>
            {loginEmailErrorMessage}
        </span>

        <input
          className={passwordInputClassName}
          type="password"
          id="login-password"
          name="login-password"
          placeholder="Password"
          value={loginPassword}
          minLength="8"
          onChange={handleInputChange}
          required />
        <span id="login-password-error" className={passwordErrorClassName}>
            {loginPasswordErrorMessage}
        </span>

      </Form>
    </section>

  );
}

Login.propTypes = {
  /** A boolean indicating if the data is getting processed and loaded */
  isDataLoading       : PropTypes.bool.isRequired,
  /** A *callback function* that handles the form submit */
  onSubmit            : PropTypes.func.isRequired,
  /** A React component state representing the login email of the user */
  loginEmail          : PropTypes.string.isRequired,
  /** A React component state `loginEmail` setter callback to set the login email of the user */
  setLoginEmail       : PropTypes.func.isRequired,
  /** A React component state representing the login password of the user */
  loginPassword       : PropTypes.string.isRequired,
  /** A React component state `loginPassword` setter callback to set the login password of the user */
  setLoginPassword    : PropTypes.func.isRequired,
};

export default Login;
