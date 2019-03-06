import UserService from '../services/user.service';

class UserController {
  static createUser(req, res) {
    const newUser = req.body;
    const response = UserService.createUser(newUser);
    return res.status(201).json(response);
  }
}
export default UserController;
