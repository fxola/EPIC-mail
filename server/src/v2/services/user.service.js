import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../models/db';

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
  static async createUser(userDetails) {
    const { email, firstName, lastName, password } = userDetails;

    try {
      const hashedPassword = this.hashPassword(password);

      const query = `insert into users (email, first_name,last_name, password) values ($1,$2,$3,$4) returning *`;
      const { rows } = await db.query(query, [email, firstName, lastName, hashedPassword]);
      const payloadEmail = rows[0].email;

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
  static async logUserIn(userCredentials) {
    const { email, password } = userCredentials;
    try {
      const query = `select * from users where email = $1`;
      const { rows } = await db.query(query, [email]);
      const hash = rows[0].password;

      if (this.comparePassword(password, hash) === true) {
        const bearerToken = this.getToken({ email });

        return bearerToken;
      }
    } catch (e) {
      return e;
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
