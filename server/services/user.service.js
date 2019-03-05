import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mockData from '../utils/mockData';
import User from '../models/user.model';

dotenv.config();

class UserService {
  // check if email exists in db
  static emailExists(userEmail) {
    const existingEmails = mockData.users.reduce((emailArray, userDetail) => {
      return emailArray.concat(userDetail.email);
    }, []);
    return existingEmails.includes(userEmail);
  }

  static createUser(email, firstName, lastName, password) {
    if (this.validate(email, password).status === 200 && !this.emailExists(email)) {
      // logic for creating a new user ID
      const userLength = mockData.users.length;
      const lastUserId = mockData.users[userLength - 1].id;
      const id = lastUserId + 1;

      const newUser = new User(id, email, firstName, lastName, password);

      // updating the db with the newly created user
      mockData.users.push(newUser);

      const { payloadId, payloadEmail, payloadfirstName, payloadLastName } = newUser;

      const payload = {
        payloadId,
        payloadEmail,
        payloadfirstName,
        payloadLastName
      };

      const token = this.getToken(payload);
      return {
        status: 200,
        data: token
      };
    }
    return {};
  }

  static validate(email, password) {
    const passwordPattern = /\w{6,}/g;
    // eslint-disable-next-line no-useless-escape
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailPattern.test(email)) {
      return {
        status: 403,
        error: 'Invalid email address provided'
      };
    }
    if (!passwordPattern.test(password)) {
      return {
        status: 403,
        error: 'Password must not be less than six(6) characters'
      };
    }
    return {
      status: 200
    };
  }

  static getToken(userPayload) {
    return jwt.sign(userPayload, process.env.SECRET, { expiresIn: '1h' });
  }
}

export default UserService;
