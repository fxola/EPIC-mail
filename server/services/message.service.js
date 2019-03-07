import mockData from '../utils/mockData';
// import Contact from '../models/contact.model';
import Message from '../models/message.model';

class MessageService {
  static createMessage(incomingMessage) {
    const receiverEmail = incomingMessage.to;
    const receiver = mockData.contacts.find(contact => receiverEmail === contact.email);
    const receiverId = receiver.id;
    if (receiverId) {
      // this means the message is not a draft
    }

    // this means the message is a draft
    const { subject, message } = incomingMessage;
    const createdOn = new Date();
    const msgLength = mockData.messages.length;
    const lastMsgId = mockData.messages[msgLength - 1].id;
    const id = lastMsgId + 1;
    const newMessage = new Message(id, createdOn, subject, message);

    mockData.messages.push(newMessage);
    return {
      status: 201,
      data: [newMessage]
    };
  }
}

export default MessageService;
