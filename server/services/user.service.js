import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mockData from '../utils/mockData';
import User from '../models/user.model';

dotenv.config();

class UserService {
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

      const { payloadId, payloadEmail, payloadfirstName, payloadLastName } = newUser;

      const payload = {
        payloadId,
        payloadEmail,
        payloadfirstName,
        payloadLastName
      };

      const bearerToken = this.getToken(payload);
      return {
        status: 201,
        data: [
          {
            token: bearerToken
          }
        ]
      };
    } catch (err) {
      return {
        status: 500,
        error: err
      };
    }
  }

  static logUserIn(userCredentials) {
    const { email, password } = userCredentials;

    try {
      const userDetails = mockData.users.find(user => user.email);
      const hash = userDetails.password;

      if (this.comparePassword(password, hash) === true) {
        const bearerToken = this.getToken(email);

        return {
          status: 201,
          data: [
            {
              token: bearerToken
            }
          ]
        };
      }

      const errorResponse = {
        status: 401,
        error: 'Authentication Failed'
      };

      return errorResponse;
    } catch (err) {
      return {
        status: 500,
        error: err
      };
    }
  }

  static getToken(userPayload) {
    return jwt.sign(userPayload, process.env.SECRET, { expiresIn: '1h' });
  }

  static hashPassword(password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return err;
      }
      return hash;
    });
  }

  static comparePassword(password, hash) {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        return err;
      }
      return result;
    });
  }
}

export default UserService;
