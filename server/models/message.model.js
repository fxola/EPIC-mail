class Message {
  constructor(id, createdOn, subject, message, parentMessageId, status) {
    this.id = id;
    this.createdOn = createdOn;
    this.firstName = subject;
    this.message = message;
    this.parentMessageId = parentMessageId;
    this.status = status;
  }
}

export default Message;
