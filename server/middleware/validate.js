import mockData from '../utils/mockData';

class Validation {
  static check(req, res, next) {
    const userDetails = req.body;
    const { email, firstName, lastName, password } = userDetails;

    const passwordPattern = /\w{6,}/g;
    // eslint-disable-next-line no-useless-escape
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailPattern.test(email)) {
      Validation.invalidEmailResponse(res);
    }

    if (!firstName || !lastName) {
      Validation.invalidNameResponse(res);
    }

    if (!passwordPattern.test(password)) {
      Validation.invalidPasswordResponse(res);
    }
    if (Validation.emailExists(email)) {
      Validation.emailExistsResponse(res);
    }

    next();
  }

  static invalidPasswordResponse(res) {
    const statusCode = 422;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Password must not be less than six(6) characters'
    });
  }

  static invalidEmailResponse(res) {
    const statusCode = 422;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid email address provided'
    });
  }

  static invalidNameResponse(res) {
    const statusCode = 422;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Invalid Name Provided'
    });
  }

  static emailExistsResponse(res) {
    const statusCode = 409;
    res.status(statusCode).json({
      status: statusCode,
      error: 'Email already in use'
    });
  }

  // check if email exists in db
  static emailExists(userEmail) {
    console.log(userEmail);
    const existingEmails = mockData.users.reduce((emailArray, userDetail) => {
      return emailArray.concat(userDetail.email);
    }, []);
    console.log(existingEmails);
    return existingEmails.includes(userEmail);
  }
}

export default Validation;
