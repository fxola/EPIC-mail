import MessageService from '../services/message.service';

class MessageController {
  static createMessage(req, res) {
    const response = MessageService.createMessage(req.body, req.body.email);
    return res.status(response.status).send(response);
  }
}

export default MessageController;
