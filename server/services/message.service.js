import mockData from '../utils/mockData';
// import Contact from '../models/contact.model';
import Message from '../models/message.model';

class MessageService {
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

      return {
        status: 201,
        data: [newMessage]
      };
    } catch (err) {
      return {
        status: 500,
        error: 'Failed to save'
      };
    }
  }

  static retractMessage(id) {
    const messageIndex = mockData.messages.findIndex(message => message.id === parseInt(id, 10));
    if (messageIndex !== -1) {
      return mockData.messages.splice(messageIndex, 1);
    }
    return false;
  }

  static readMessage(id) {
    const foundMessage = mockData.messages.find(message => message.id === parseInt(id, 10));

    return foundMessage || {};
  }
}

export default MessageService;
