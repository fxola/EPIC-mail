/* eslint-disable default-case */
import mockData from '../utils/mockData';
import Message from '../models/message.model';
import MessageHelper from './utils';
import db from '../models/db';

/**
 *
 * @class MessageService
 * @exports MessageService
 */
class MessageService {
  static async getUserId(email) {
    const sql = `select id from users where email = $1`;
    const user = await db.query(sql, [email]);
    return user.rows[0].id;
  }

  /**
   *
   * Handles the logic for creating a new message
   * @static
   * @param {Object} incomingMessage message details present in the request body
   * @param {String} senderEmail email of the currently logged in user
   * @returns {Object} A new message object
   * @memberof MessageService
   */
  static async createMessage(incomingMessage, senderEmail) {
    // find receiver  email and get receiver id
    const { message, subject, to } = incomingMessage;

    const receiverEmail = to;
    try {
      // get sender id
      const senderId = await this.getUserId(senderEmail);

      // get reciever id
      const query = `select id from users where email = $1`;
      const { rows } = await db.query(query, [receiverEmail]);

      if (rows.length === 0) {
        // if receiver id isn't found it is a draft message
        const drafts = await MessageHelper.saveMessage(message, subject, senderId, '', 'draft');
        return drafts;
      }
      // receiver id is found, it is a sent message
      const receiverId = rows[0].id;
      const sentMessage = await MessageHelper.saveMessage(
        message,
        subject,
        senderId,
        receiverId,
        'sent'
      );
      return sentMessage;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   * Handles the logic for retracting a message
   * @static
   * @param {number} id ID of the message to be deleted
   * @returns {(Object|Boolean)} The deleted message object or Boolean
   * @memberof MessageService
   */
  static async retractMessage(id, userEmail) {
    const userId = await this.getUserId(userEmail);

    const deleted = await MessageHelper.retractMessage(id, userId);
    if (deleted) return true;
    return false;
  }

  /**
   *
   * Handles the logic for reading a specific message
   * @static
   * @param {number} id ID of the message to be read
   * @returns {Object} The read message object or an empty object
   * @memberof MessageService
   */
  static async readMessage(id) {
    const foundMessage = await MessageHelper.readMessage(id);
    return foundMessage || {};
  }

  /**
   *
   * Handles the logic for getting all messages related to a specific User depending on the message type provided
   * @static
   * @param {String} userEmail email of the currently logged in user
   * @returns {Array} An array of all sent messages found for a user or an empty array
   * @memberof MessageService
   */
  static async getMessages(userEmail, messageType) {
    const userId = await this.getUserId(userEmail);
    let result;
    switch (messageType) {
      case 'all':
        result = await MessageHelper.getMessages(userId, messageType);
        break;
      case 'sent':
        result = await MessageHelper.getMessages(userId, messageType);
        break;
      case 'unread':
        result = await MessageHelper.getMessages(userId, messageType);
        break;
    }

    if (result.length > 0) return result;
    return [];
  }
}

export default MessageService;
