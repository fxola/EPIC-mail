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
    const { email } = userCredentials;

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

  static getToken(userPayload) {
    return jwt.sign(userPayload, process.env.SECRET, { expiresIn: '1h' });
  }

  static hashPassword(password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return {
          status: 500,
          error: err
        };
      }
      return hash;
    });
  }
}

export default UserService;
