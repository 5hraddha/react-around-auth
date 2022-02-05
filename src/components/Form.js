import React                from 'react';
import PropTypes            from 'prop-types';
import {Link}               from 'react-router-dom';

/**
 * The **Form** component representing user authorization and registration related forms.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Form(props){
  const {
    name,
    title,
    btnLabel,
    linkPath,
    linkText,
    onSubmit,
    children,
  }                                         = props;
  const formRef                             = React.createRef();
  const [isFormValid, setIsFormValid]       = React.useState(false);

  const buttonClassName = `form__submit ${!isFormValid && `form__submit_disabled`}`;

  const handleChange = () => {
    setIsFormValid(formRef.current.checkValidity());
  }

  return (
    <form
      className="form"
      name={name}
      action="#"
      ref={formRef}
      onSubmit={onSubmit}
      onChange={handleChange}
      noValidate>

      <h2 className="form__title">{title}</h2>

      {children}

      <button className={buttonClassName} type="submit" aria-label={`${btnLabel} ${name}`}>
        {btnLabel}
      </button>

      <Link to={linkPath} className="form__link">
        {linkText}
      </Link>
    </form>
  );
}

Form.propTypes = {
  /** A string representing the **name of the form** */
  name                : PropTypes.string.isRequired,
  /** A string representing the **title of the form** */
  title               : PropTypes.string.isRequired,
  /** A string representing the **label** of the Submit button */
  btnLabel            : PropTypes.string.isRequired,
  /** A string representing the **route path** of the link below the submit button */
  linkPath            : PropTypes.string.isRequired,
  /** A string representing the **text** of the link below the submit button */
  linkText            : PropTypes.string.isRequired,
  /** A *callback function* that handles the form submit */
  onSubmit            : PropTypes.func.isRequired,
  /** Any form elements like input, label, etc */
  children            : PropTypes.any.isRequired,
};

export default Form;
