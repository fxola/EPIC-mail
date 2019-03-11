import UserService from '../services/user.service';

class UserController {
  static createUser(req, res) {
    const newUser = req.body;
    const response = UserService.createUser(newUser);
    return res.status(201).json(response);
  }

  static logUserIn(req, res) {
    const userCredentials = req.body;
    const response = UserService.logUserIn(userCredentials);
    return res.status(200).json(response);
  }
}
export default UserController;
