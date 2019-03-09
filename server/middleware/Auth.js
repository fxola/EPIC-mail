import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

class Auth {
  static getUser(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET);
      req.body.email = decoded.email;

      return next();
    } catch (e) {
      return res.status(401).send({
        status: 401,
        error: `You do not have access to this page. ${e}`
      });
    }
  }
}

export default Auth;
