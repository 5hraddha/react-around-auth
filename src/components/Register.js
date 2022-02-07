import React                    from 'react';
import PropTypes                from 'prop-types';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Form                     from './Form';

/**
 * The **Register** component representing user registration form.
 *
 * @version 1.0.1
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
  const {isValid, errors, handleChange, resetForm} = useFormAndValidation(['register-email', 'register-password']);

  // Reset form values every time the popup opens
  React.useEffect(() => {
    const initialValues = {
      'register-email': '',
      'register-password': '',
    };
    setRegisterEmail('');
    setRegisterPassword('');
    resetForm({...initialValues}, {...initialValues}, true);
  }, [resetForm, setRegisterEmail, setRegisterPassword]);

  const handleInputChange = (e) => {
    if(e.target.name === 'register-email'){
      setRegisterEmail(e.target.value);
    }
    if(e.target.name === 'register-password'){
      setRegisterPassword(e.target.value);
    }
    handleChange(e);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(isValid || (registerEmail && registerPassword)){
      onSubmit({registerEmail, registerPassword});
    }
  }

  const emailInputClassName = `form__input ${(!isValid && errors['register-email']) && `form__input_type_error`}`;
  const emailErrorClassName = `form__error ${(!isValid && errors['register-email']) && `form__error_visible`}`;
  const passwordInputClassName = `form__input ${(!isValid && errors['register-password']) && `form__input_type_error`}`;
  const passwordErrorClassName = `form__error ${(!isValid && errors['register-password']) && `form__error_visible`}`;

  return (
    <div className="content">
      <section className='auth-form'>
        <Form
          name="register"
          title="Sign up"
          btnLabel={(isDataLoading) ? 'Signing up': 'Sign up'}
          linkPath="/login"
          linkText="Already a member? Log in here!"
          onSubmit={handleFormSubmit}>

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
              {errors['register-email']}
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
              {errors['register-password']}
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
