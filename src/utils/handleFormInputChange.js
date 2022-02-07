/**
 * This module sets the input value, checks if the input is valid and sets error message if any.
 * @module handleFormInputChange
 */

const handleFormInputChange = (e, inputArr) => {
  const {name, value, validity, validationMessage} = e.target;
  const inputChanged = inputArr.filter(input => input.name === name);

  const { setValue, setValidity, setErrorMessage } = inputChanged[0];
  setValue(value);
  setValidity(validity.valid);
  (!validity.valid) && setErrorMessage(validationMessage);
}

export default handleFormInputChange;
