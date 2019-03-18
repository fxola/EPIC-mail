import mockData from '../utils/mockData';
import Message from '../models/message.model';

/**
 *
 * @class MessageService
 * @exports MessageService
 */
class MessageService {
  /**
   *
   * Handles the logic for creating a new message
   * @static
   * @param {Object} incomingMessage message details present in the request body
   * @param {String} senderEmail email of the currently logged in user
   * @returns {Object} A new message object
   * @memberof MessageService
   */
  static createMessage(incomingMessage, senderEmail) {
    const receiverEmail = incomingMessage.to;

    const msgLength = mockData.messages.length;
    const lastMsgId = mockData.messages[msgLength - 1].id;
    const id = lastMsgId + 1;

    const receiver = mockData.contacts.find(contact => receiverEmail === contact.email);

    if (receiver) {
      // this means the message is not a draft

      const receiverId = receiver.id;
      const newMessage = this.sendMessage(incomingMessage, receiverId, senderEmail);
      return this.saveMessage(id, newMessage);
    }

    // this means the message is a draft
    return this.saveMessage(id, incomingMessage);
  }

  /**
   *
   * Handles the logic for sending a new message
   * @static
   * @param {Object} incomingMessage message details present in the request body
   * @param {number} receiverId ID of the message receiver
   * @param {String} senderEmail email of the currently logged in user
   * @returns {Object} A new message object
   * @memberof MessageService
   */
  static sendMessage(incomingMessage, receiverId, senderEmail) {
    const sender = mockData.users.find(user => senderEmail === user.email);
    const senderId = sender.id;

    // @todo figure out how to tie sender and receiver to the same msg subject

    //  find all messages where the message subject is the same
    const conversation = mockData.messages.filter(message => {
      return message.subject.toLowerCase() === incomingMessage.subject.toLowerCase();
    });

    let parentMessageId = null; // where there has never been an exising conversation

    if (conversation.length >= 1) {
      // get the message ids
      const messageIds = conversation.reduce((ids, message) => {
        return ids.concat(message.id);
      }, []);

      const sortedIds = messageIds.sort((a, b) => a - b);
      // get the last id
      parentMessageId = sortedIds[sortedIds.length - 1]; // there is an exiisting conversation
    }
    const { to, subject, message } = incomingMessage;
    const status = 'sent';

    const newMessage = {
      to,
      subject,
      message,
      status,
      senderId,
      receiverId,
      parentMessageId
    };

    return newMessage;
  }

  /**
   *
   * Handles the logic for saving a message
   * @static
   * @param {Object} incomingMessage message details
   * @param {number} id ID of the message
   * @returns {Object} A new message object
   * @memberof MessageService
   */
  static saveMessage(id, incomingMessage) {
    try {
      const createdOn = new Date();

      let newMessage;
      if (!Object.keys(incomingMessage).includes('senderId')) {
        // means message is a draft
        const { subject, message } = incomingMessage;

        newMessage = new Message(id, createdOn, subject, message);
      }

      const { message, subject, status, parentMessageId, receiverId, senderId } = incomingMessage;
      newMessage = new Message(
        id,
        createdOn,
        subject,
        message,
        parentMessageId,
        status,
        senderId,
        receiverId
      );
      mockData.messages.push(newMessage);
      return newMessage;
    } catch (err) {
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
  static retractMessage(id) {
    const messageIndex = mockData.messages.findIndex(message => message.id === parseInt(id, 10));
    if (messageIndex !== -1) {
      return mockData.messages.splice(messageIndex, 1);
    }
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
  static readMessage(id) {
    const foundMessage = mockData.messages.find(message => message.id === parseInt(id, 10));
    if (foundMessage) {
      // means message has been read
      foundMessage.status = 'read';
      const readMessageIndex = mockData.messages.findIndex(
        message => message.id === parseInt(id, 10)
      );
      mockData.messages.splice(readMessageIndex, 1, foundMessage); // update found msg status to read
    }
    return foundMessage || {};
  }

  /**
   *
   * Handles the logic for getting all a user's sent messages
   * @static
   * @param {String} userEmail email of the currently logged in user
   * @returns {Array} An array of all sent messages found for a user or an empty array
   * @memberof MessageService
   */
  static getSentMessages(userEmail) {
    const sender = mockData.users.find(user => user.email === userEmail);
    const { id } = sender;
    const sentMessages = mockData.messages.filter(message => {
      return message.status === 'sent' && message.senderId === id;
    });

    return sentMessages || [];
  }

  /**
   *
   * Handles the logic for getting all a user's messages
   * @static
   * @param {String} userEmail email of the currently logged in user
   * @returns {Array} An array of all messages found for a user or an empty array
   * @memberof MessageService
   */
  static getAllMessages(userEmail) {
    const receiver = mockData.users.find(user => user.email === userEmail);
    const { id } = receiver;
    const messageList = mockData.messages.filter(message => {
      return message.receiverId === id;
    });

    return messageList || [];
  }

  /**
   *
   * Handles the logic for getting all a user's unread messages
   * @static
   * @param {String} userEmail email of the currently logged in user
   * @returns {Array} An array of all unread messages found for a user or an empty array
   * @memberof MessageService
   */
  static getAllUnreadMessages(userEmail) {
    const receiver = mockData.users.find(user => user.email === userEmail);
    const { id } = receiver;
    const unreadMessages = mockData.messages.filter(message => {
      return message.status === 'unread' && message.receiverId === id;
    });

    return unreadMessages || [];
  }
}

export default MessageService;
