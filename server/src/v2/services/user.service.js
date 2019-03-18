import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mockData from '../utils/mockData';
import User from '../models/user.model';

dotenv.config();

/**
 *
 * @class UserService
 * @exports UserService
 */
class UserService {
  /**
   *
   * Handles the logic for creating a new user
   * @static
   * @param {Object} userDetails details present in the request body
   * @returns {(String|Object)} A token string or an error object
   * @memberof UserService
   */
  static createUser(userDetails) {
    const { email, firstName, lastName, password } = userDetails;

    try {
      const hashedPassword = this.hashPassword(password);
      // logic for creating a new user ID
      const userLength = mockData.users.length;
      const lastUserId = mockData.users[userLength - 1].id;
      const id = lastUserId + 1;

      const newUser = new User(id, email, firstName, lastName, hashedPassword);

      // updating the db with the newly created user
      mockData.users.push(newUser);

      const payloadEmail = newUser.email;
      const payload = {
        payloadEmail
      };

      const bearerToken = this.getToken(payload);
      return bearerToken;
    } catch (err) {
      return err;
    }
  }

  /**
   *
   * Handles the logic for logging  a user in
   * @static
   * @param {Object} userCredentials details present in the request body
   * @returns {(String|Boolean)} A token string or a Boolean
   * @memberof UserService
   */
  static logUserIn(userCredentials) {
    const { email, password } = userCredentials;

    const userDetails = mockData.users.find(user => email === user.email);
    const hash = userDetails.password;

    if (this.comparePassword(password, hash) === true) {
      const bearerToken = this.getToken({ email });

      return bearerToken;
    }

    return false;
  }

  /**
   *
   * Generates token string
   * @static
   * @param {Object} userPayload Incoming payload required to generate token
   * @returns {String} A token string
   * @memberof UserService
   */
  static getToken(userPayload) {
    return jwt.sign(userPayload, process.env.SECRET, { expiresIn: '1h' });
  }

  /**
   *
   * Generates token string
   * @static
   * @param {String} password password required to be encrypted
   * @returns {String} A hash string
   * @memberof UserService
   */
  static hashPassword(password) {
    const hash = bcrypt.hashSync(password, 10, (err, result) => {
      if (err) {
        return err;
      }
      return result;
    });
    return hash;
  }

  /**
   *
   * Compares a password against a hash
   * @static
   * @param {String} password password required to be encrypted
   * @param {String} hash data to be compared against
   * @returns {Boolean}
   * @memberof UserService
   */
  static comparePassword(password, hash) {
    const result = bcrypt.compareSync(password, hash);
    return result;
  }
}

export default UserService;
