/* eslint-disable default-case */
import MessageService from '../services/message.service';
/**
 *
 * @class MessageController
 * @description Specifies which method handles a given request for a specific endpoint
 * @exports MessageController
 */
class MessageController {
  /**
   *
   * Creates a new message
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} JSON API Response
   * @memberof MessageController
   */
  static async createMessage(req, res) {
    const newMessage = await MessageService.createMessage(req.body, req.body.email);
    if (newMessage) {
      return res.status(201).send({
        status: 201,
        data: [newMessage],
        message: `New Message Created Succesfully`
      });
    }
    return res.status(500).json({
      status: 500,
      error: 'Failed to save',
      message: 'Request Unsucessful'
    });
  }

  /**
   *
   * Retracts/deletes a specific message
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} JSON API Response
   * @memberof MessageController
   */
  static async retractMessage(req, res) {
    if (!Number(req.params.id)) {
      return res.status(403).json({
        status: 403,
        error: 'Request Forbidden',
        message: 'Invalid ID provided'
      });
    }

    const retractedMessage = await MessageService.retractMessage(req.params.id, req.body.email);

    if (retractedMessage) {
      return res.status(200).json({
        status: 200,
        data: [
          {
            message: 'Message deleted/retracted succesfully'
          }
        ],
        message: 'Request Successful'
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'Message does not exist',
      message: 'Request Unsuccessful'
    });
  }

  /**
   *
   * Reads a specific message
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} JSON API Response
   * @memberof MessageController
   */
  static async readMessage(req, res) {
    if (!Number(req.params.id)) {
      return res.status(403).json({
        status: 403,
        error: 'Request Forbidden',
        message: 'Invalid ID provided'
      });
    }
    const readMessage = await MessageService.readMessage(req.params.id);

    if (Object.entries(readMessage).length > 0) {
      return res.status(200).json({
        status: 200,
        data: readMessage,
        message: `Request successful`
      });
    }

    return res.status(404).json({
      status: 404,
      error: 'Message does not exist',
      message: 'Request Unsuccessful'
    });
  }

  /**
   *
   * Fetches all messages related to a specific User depending on the route provided
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} JSON API Response
   * @memberof MessageController
   */
  static async fetchMessages(req, res) {
    let message;
    let result;
    switch (req.url) {
      case '/':
        result = await MessageService.getMessages(req.body.email, 'all');
        message = `Request successful. You have ${result.length} message(s)`;
        break;
      case '/sent':
        result = await MessageService.getMessages(req.body.email, 'sent');
        message = `Request successful. You have sent ${result.length} message(s) in total`;
        break;
      case '/unread':
        result = await MessageService.getMessages(req.body.email, 'unread');
        message = `Request successful. You have ${result.length} unread message(s)`;
        break;
    }

    if (result.length > 0) {
      return res.status(200).json({
        status: 200,
        data: result,
        message
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No message found',
      message: 'Request Unsuccessful'
    });
  }
}

export default MessageController;
