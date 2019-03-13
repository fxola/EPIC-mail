import mockData from '../utils/mockData';

class Validation {
  static check(req, res, next) {
    const userDetails = req.body;
    const { email, firstName, lastName, password } = userDetails;

    const passwordPattern = /\w{6,}/g;

    // eslint-disable-next-line no-useless-escape
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPattern.test(email)) {
      return Validation.invalidEmailResponse(res);
    }

    if (/\s/.test(firstName) || /\s/.test(lastName)) {
      return Validation.invalidNameResponse(res);
    }

    if (!firstName || !lastName) {
      return Validation.noNameResponse(res);
    }

    if (!passwordPattern.test(password)) {
      return Validation.invalidPasswordResponse(res);
    }
    if (Validation.emailExists(email)) {
      return Validation.emailExistsResponse(res);
    }

    return next();
  }

  static loginCheck(req, res, next) {
    const { email } = req.body;
    if (!Validation.emailExists(email)) {
      return Validation.invalidCrendentialsResponse(res);
    }
    return next();
  }

  static messageCheck(req, res, next) {
    const messageBody = req.body;
    const { message, subject } = messageBody;
    if (!message || !subject) {
      return Validation.invalidMessageResponse(res);
    }
    return next();
  }

  static invalidMessageResponse(res) {
    const statusCode = 403;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid Message Provided.',
      message: 'Message subject/body can not be empty'
    });
  }

  static invalidPasswordResponse(res) {
    const statusCode = 403;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid password provided',
      message: 'Password must not be less than six(6) characters'
    });
  }

  static invalidNameResponse(res) {
    const statusCode = 403;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid firstname/lastname provided',
      message: 'No spaces are allowed in the firstname/lastname'
    });
  }

  static invalidCrendentialsResponse(res) {
    const statusCode = 401;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Authentication Failed',
      message: 'Request denied'
    });
  }

  static invalidEmailResponse(res) {
    const statusCode = 403;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid email address',
      message: 'Please provide a valid email address'
    });
  }

  static noNameResponse(res) {
    const statusCode = 422;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid name Provided.',
      message: 'firstname/lastname cannot be empty'
    });
  }

  static emailExistsResponse(res) {
    const statusCode = 409;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Email already in use',
      message: 'Please provide another email address'
    });
  }

  // check if email exists in db
  static emailExists(userEmail) {
    const existingEmails = mockData.users.reduce((emailArray, userDetail) => {
      return emailArray.concat(userDetail.email);
    }, []);
    return existingEmails.includes(userEmail);
  }
}

export default Validation;
