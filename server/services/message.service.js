import mockData from '../utils/mockData';
// import Contact from '../models/contact.model';
import Message from '../models/message.model';

class MessageService {
  static createMessage(incomingMessage, senderEmail) {
    const receiverEmail = incomingMessage.to;
    const receiver = mockData.contacts.find(contact => receiverEmail === contact.email);
    const receiverId = receiver.id;

    if (receiverId) {
      // this means the message is not a draft
      const newMessage = this.sendMessage(incomingMessage, receiverId, senderEmail);
      return this.saveMessage(newMessage);
    }

    // this means the message is a draft
    return this.saveMessage(incomingMessage);
  }

  static sendMessage(incomingMessage, receiverId, senderEmail) {
    const sender = mockData.users.find(user => senderEmail === user.email);
    const senderId = sender.id;

    // find all messages where senderId and receiverId match,
    const conversation = mockData.messages.filter(
      message => message.senderId === senderId && message.recieverId === receiverId
    );

    // get the message ids
    const messageIds = conversation.reduce((ids, message) => {
      return ids.concat(message.id);
    }, []);

    const sortedIds = messageIds.sort((a, b) => a - b);

    // get the last id
    const parentMessageId = sortedIds[sortedIds.length - 1];

    const newMessage = {
      ...incomingMessage,
      status: 'sent',
      senderId,
      receiverId,
      parentMessageId
    };

    const messageInstance = new Message(...newMessage);
    return messageInstance;
  }

  static saveMessage(incomingMessage) {
    try {
      const createdOn = new Date();

      const msgLength = mockData.messages.length;
      const lastMsgId = mockData.messages[msgLength - 1].id;
      const id = lastMsgId + 1;

      const newMessage = new Message(id, createdOn, ...incomingMessage);

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
}

export default MessageService;
