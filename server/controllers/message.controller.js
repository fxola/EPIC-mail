import MessageService from '../services/message.service';

class MessageController {
  static createMessage(req, res) {
    const { userEmail, ...message } = req.body;
    const response = MessageService.createMessage(message, userEmail);
    res.status(response.status).send(response);
  }
}

export default MessageController;
