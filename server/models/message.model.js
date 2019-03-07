class Message {
  constructor(id, createdOn, subject, message, parentMessageId, status, receiverId = null) {
    this.id = id;
    this.createdOn = createdOn;
    this.subject = subject;
    this.message = message;
    this.parentMessageId = parentMessageId;
    this.status = status; // sent, draft or read
    this.receiverId = receiverId; // is a draft if null
  }
}

export default Message;
