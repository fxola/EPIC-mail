/* eslint-disable default-case */
import db from '../models/db';
/**
 *
 *exports
 * @class Validation
 */
class Validation {
  /**
   *
   * Handles user input validation checks
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static check(req, res, next) {
    const userDetails = req.body;
    const { email, firstName, lastName, password } = userDetails;
    const trimmedEmail = email.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedPassword = password.trim();

    const passwordPattern = /\w{6,}/g;

    // eslint-disable-next-line no-useless-escape
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPattern.test(trimmedEmail)) {
      return Validation.invalidEmailResponse(res);
    }

    if (/\s/.test(trimmedFirstName) || /\s/.test(trimmedLastName)) {
      return Validation.invalidNameResponse(res);
    }

    if (!trimmedFirstName || !trimmedLastName) {
      return Validation.noNameResponse(res);
    }

    if (/\s/.test(trimmedPassword)) {
      return Validation.invalidPasswordResponse(res, 'whitespace');
    }

    if (!passwordPattern.test(trimmedPassword)) {
      return Validation.invalidPasswordResponse(res, 'length');
    }

    if (Validation.emailExists(trimmedEmail)) {
      return Validation.emailExistsResponse(res);
    }

    return next();
  }

  /**
   *
   * Checks if an email address exists in the database
   * @static
   * @param {String} userEmail email to run a check against
   * @returns {Boolean} Boolean depending on success or failure of the check
   * @memberof Validation
   */
  static async emailExists(userEmail) {
    try {
      const query = `select email from users where email = $1`;
      const { rows } = await db.query(query, [userEmail]);
      return !!(rows.length !== 0);
    } catch (e) {
      return e;
    }
  }

  /**
   *
   * Checks if user has an account
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static async loginCheck(req, res, next) {
    const { email } = req.body;
    const emailExists = await Validation.emailExists(email);
    if (!emailExists) {
      return Validation.invalidCrendentialsResponse(res);
    }
    return next();
  }

  /**
   *
   * Handles Message validation
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static messageCheck(req, res, next) {
    const messageBody = req.body;
    const { message, subject } = messageBody;
    if (!message || !subject) {
      return Validation.invalidMessageResponse(res);
    }
    return next();
  }

  /**
   *
   * Returns specific error object when an invalid message is provided
   * @static
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static invalidMessageResponse(res) {
    const statusCode = 422;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid Message Provided.',
      message: 'Message subject/body can not be empty'
    });
  }

  /**
   *
   * Returns specific error object when an invalid password is provided
   * @static
   * @param {Object} res
   * @param {String} validationType length or whitespace
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static invalidPasswordResponse(res, validationType) {
    let message;
    let statusCode;
    switch (validationType) {
      case 'length':
        statusCode = 406;
        message = 'Password must not be less than six(6) characters';
        break;
      case 'whitespace':
        statusCode = 422;
        message = 'No spaces allowed in the password';
        break;
    }

    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid password provided',
      message
    });
  }

  /**
   *
   * Returns specific error object when an invalid firstname or lastname is provided
   * @static
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static invalidNameResponse(res) {
    const statusCode = 422;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid firstname/lastname provided',
      message: 'No spaces are allowed in the firstname/lastname'
    });
  }

  /**
   *
   * Returns specific error object when user provides wrong credentials on login
   * @static
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static invalidCrendentialsResponse(res) {
    const statusCode = 401;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Authentication Failed',
      message: 'Request denied'
    });
  }

  /**
   *
   * Returns specific error object when user provides an invalid email address
   * @static
   * @param {Object} res
   * @param {function} next
   * @returns {Object} error response object
   * @memberof Validation
   */

  static invalidEmailResponse(res) {
    const statusCode = 422;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid email address',
      message: 'Please provide a valid email address'
    });
  }

  /**
   *
   * Returns specific error object when user provides an invalid first or last name
   * @static
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static noNameResponse(res) {
    const statusCode = 422;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid name Provided.',
      message: 'firstname/lastname cannot be empty'
    });
  }

  /**
   *
   * Returns specific error object when user provides an already taken email address
   * @static
   * @param {Object} res
   * @param {function} next
   * @returns {(function|Object)} function next() or an error response object
   * @memberof Validation
   */
  static emailExistsResponse(res) {
    const statusCode = 409;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Email already in use',
      message: 'Please provide another email address'
    });
  }
}

export default Validation;
