/**
 *
 *@exports
 * @class Message
 */
class Message {
  /**
   *Creates an instance of Message.
   * @param {integer} id
   * @param {string} createdOn
   * @param {string} subject
   * @param {string} message
   * @param {integer} [parentMessageId=null]
   * @param {string} [status='draft']
   * @param {integer} [senderId=null]
   * @param {integer} [receiverId=null]
   * @memberof Message
   */
  constructor(
    id,
    createdOn,
    subject,
    message,
    parentMessageId = null,
    status = 'draft',
    senderId = null,
    receiverId = null
  ) {
    this.id = id;
    this.createdOn = createdOn;
    this.subject = subject;
    this.message = message;
    this.parentMessageId = parentMessageId; // is a draft if null
    this.status = status; // sent, draft or read
    this.receiverId = receiverId; // is a draft if null
    this.senderId = senderId; // is a draft if null
  }
}

export default Message;
