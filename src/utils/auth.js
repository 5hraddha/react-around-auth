/**
 * This module enables API requests related to registration and authorization using API - https://register.nomoreparties.co
 * @module Auth
 */

/** Class representing all the registration and authorization related requests */
class Auth {
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /**
   * Checks the server's response of the Fetch API call to tell whether it was successful or not.
   * @param {Object} response The response of the Fetch API call.
   * @return {Object} If the response was successful, returns the JSON else a Promise object with a given reason.
   */
  _checkResponseStatus = response => {
    if(response.ok){
      return response.json();
    }
    return Promise.reject(response);
  }

  /**
   * Register new user to the server using a POST request.
   * @param {string} email The email ID of the user trying to register.
   * @param {string} password The password of the user trying to register.
   * @return {Promise} The Promise of the Fetch API call.
   */
  register = (email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Login a registered user to the server using a POST request.
   * @param {string} email The email ID of the user trying to login.
   * @param {string} password The password of the user trying to login.
   * @return {Promise} The Promise of the Fetch API call.
   */
  login = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Validate a registered user's token to the server using a GET request.
   * @param {string} userToken The token of the user trying to validate.
   * @return {Promise} The Promise of the Fetch API call.
   */
  validateUserToken = (userToken) => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        "Authorization" : `Bearer ${userToken}`,
      }
    })
      .then(this._checkResponseStatus);
  }
}

export default new Auth({
  baseUrl: "https://register.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
