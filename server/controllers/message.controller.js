import MessageService from '../services/message.service';

class MessageController {
  static createMessage(req, res) {
    console.log(req.body.email);
    const response = MessageService.createMessage(req.body, req.body.email);
    return res.status(response.status).send(response);
  }
}

export default MessageController;
