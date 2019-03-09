import MessageService from '../services/message.service';

class MessageController {
  static createMessage(req, res) {
    const response = MessageService.createMessage(req.body, req.body.email);
    return res.status(response.status).send(response);
  }

  static retractMessage(req, res) {
    const retractedMessage = MessageService.retractMessage(req.params.id);

    if (retractedMessage) {
      return res.status(200).json({
        status: 200,
        data: [
          {
            message: 'Message deleted/retracted succesfully'
          }
        ]
      });
    }

    return res.status(404).json({
      status: 404,
      data: [
        {
          message: 'Message does not exist'
        }
      ]
    });
  }

  static readMessage(req, res) {
    const readMessage = MessageService.readMessage(req.params.id);

    if (readMessage) {
      return res.status(200).json({
        status: 200,
        data: [readMessage]
      });
    }

    return res.status(404).json({
      status: 404,
      data: [
        {
          message: 'Message does not exist'
        }
      ]
    });
  }
}

export default MessageController;
