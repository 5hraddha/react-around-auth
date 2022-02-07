import React                from 'react';
import PropTypes            from 'prop-types';
import Form                 from './Form';

/**
 * The **Register** component representing user registration form.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Register(props){
  const {
    isDataLoading,
    onSubmit,
    registerEmail,
    setRegisterEmail,
    registerPassword,
    setRegisterPassword,
  }  = props;
  const [isRegisterEmailValid, setIsRegisterEmailValid]                 = React.useState(true);
  const [isRegisterPasswordValid, setIsRegisterPasswordValid]           = React.useState(true);
  const [registerEmailErrorMessage, setRegisterEmailErrorMessage]       = React.useState('');
  const [registerPasswordErrorMessage, setRegisterPasswordErrorMessage] = React.useState('');

  const emailInputClassName = `form__input ${(!isRegisterEmailValid) && `form__input_type_error`}`;
  const emailErrorClassName = `form__error ${(!isRegisterEmailValid) && `form__error_visible`}`;
  const passwordInputClassName = `form__input ${(!isRegisterPasswordValid) && `form__input_type_error`}`;
  const passwordErrorClassName = `form__error ${(!isRegisterPasswordValid) && `form__error_visible`}`;

  React.useEffect(() => {
    setRegisterEmail('');
    setRegisterPassword('');
    setIsRegisterEmailValid(true);
    setIsRegisterPasswordValid(true);
    setRegisterEmailErrorMessage('');
    setRegisterPasswordErrorMessage('');
  }, [setRegisterEmail, setRegisterPassword]);

  const handleInputChange = e => {
    const {name, value, validity, validationMessage} = e.target;
    switch (name) {
      case 'register-email' : {
        setRegisterEmail(value);
        setIsRegisterEmailValid(validity.valid);
        (!validity.valid) && setRegisterEmailErrorMessage(validationMessage);
        break;
      }
      case 'register-password': {
        setRegisterPassword(value);
        setIsRegisterPasswordValid(validity.valid);
        (!validity.valid) && setRegisterPasswordErrorMessage(validationMessage);
        break;
      }
      default: break;
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if((isRegisterEmailValid && isRegisterPasswordValid)
      || (registerEmail !== '' && registerPassword !== '')){
      onSubmit({registerEmail, registerPassword});
    }
  }

  return (
    <div className="content">
      <section className='auth-form'>
        <Form
          name="register"
          title="Sign up"
          btnLabel={(isDataLoading) ? 'Signing up': 'Sign up'}
          linkPath="/login"
          linkText="Already a member? Log in here!"
          onSubmit={handleSubmit}>

          <input
            className={emailInputClassName}
            type="email"
            id="register-email"
            name="register-email"
            placeholder="Email"
            value={registerEmail}
            onChange={handleInputChange}
            required />
          <span id="register-email-error" className={emailErrorClassName}>
              {registerEmailErrorMessage}
          </span>

          <input
            className={passwordInputClassName}
            type="password"
            id="register-password"
            name="register-password"
            placeholder="Password"
            value={registerPassword}
            minLength="8"
            onChange={handleInputChange}
            required />
          <span id="register-password-error" className={passwordErrorClassName}>
              {registerPasswordErrorMessage}
          </span>

        </Form>
      </section>
    </div>
  );
}

Register.propTypes = {
  /** A boolean indicating if the data is getting processed and loaded */
  isDataLoading       : PropTypes.bool.isRequired,
  /** A *callback function* that handles the form submit */
  onSubmit            : PropTypes.func.isRequired,
  /** A React component state representing the register email of the user */
  registerEmail          : PropTypes.string.isRequired,
  /** A React component state `registerEmail` setter callback to set the register email of the user */
  setRegisterEmail       : PropTypes.func.isRequired,
  /** A React component state representing the register password of the user */
  registerPassword       : PropTypes.string.isRequired,
  /** A React component state `registerPassword` setter callback to set the register password of the user */
  setRegisterPassword    : PropTypes.func.isRequired,
};

export default Register;
