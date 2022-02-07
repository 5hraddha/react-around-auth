import React                    from 'react';
import PropTypes                from 'prop-types';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Form                     from './Form';

/**
 * The **Login** component representing user authorization or login form.
 *
 * @version 1.0.1
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
  const {isValid, errors, handleChange, resetForm} = useFormAndValidation(['login-email', 'login-password']);

  // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialValues = {
      'login-email': '',
      'login-password': '',
    };
    setLoginEmail('');
    setLoginPassword('');
    resetForm({...initialValues}, {...initialValues}, true);
  }, [resetForm, setLoginEmail, setLoginPassword]);

  const handleInputChange = (e) => {
    if(e.target.name === 'login-email'){
      setLoginEmail(e.target.value);
    }
    if(e.target.name === 'login-password'){
      setLoginPassword(e.target.value);
    }
    handleChange(e);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(isValid || (loginEmail && loginPassword)){
      onSubmit({loginEmail, loginPassword});
    }
  }

  const emailInputClassName = `form__input ${(!isValid && errors['login-email']) && `form__input_type_error`}`;
  const emailErrorClassName = `form__error ${(!isValid && errors['login-email']) && `form__error_visible`}`;
  const passwordInputClassName = `form__input ${(!isValid && errors['login-password']) && `form__input_type_error`}`;
  const passwordErrorClassName = `form__error ${(!isValid && errors['login-password']) && `form__error_visible`}`;

  return (
    <div className="content">
      <section className='auth-form'>
        <Form
          name="login"
          title="Log in"
          btnLabel={(isDataLoading) ? 'Logging in': 'Log in'}
          linkPath="/register"
          linkText="Not a member yet? Sign up here!"
          onSubmit={handleFormSubmit}>

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
              {errors['login-email']}
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
              {errors['login-password']}
          </span>

        </Form>
      </section>
    </div>
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
