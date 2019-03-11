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

  static fetchSentMessages(req, res) {
    const sentMessages = MessageService.getSentMessages(req.body.email);
    if (sentMessages.length !== 0) {
      return res.status(200).json({
        status: 200,
        data: sentMessages
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No message found'
    });
  }

  static fetchAllMessages(req, res) {
    const allMessages = MessageService.getAllMessages(req.body.email);
    if (allMessages.length !== 0) {
      return res.status(200).json({
        status: 200,
        data: allMessages
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'No message found'
    });
  }
}

export default MessageController;
