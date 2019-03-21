/* eslint-disable default-case */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-case-declarations */
import db from '../models/db';

class MessageHelper {
  static async saveMessage(message, subject, senderId, receiverId, messageType) {
    let result;
    let command;

    switch (messageType) {
      case 'draft':
        command = `insert into messages (message,subject,user_id) values ($1,$2,$3) returning *`;
        const draftMessage = await db.query(command, [message, subject, senderId]);
        result = draftMessage.rows[0];
        break;
      case 'sent':
        command = `insert into messages (message,subject,user_id,status) values ($1,$2,$3,$4) returning *`;
        const sentMessage = await db.query(command, [message, subject, senderId, 'sent']);
        const messageId = sentMessage.rows[0].id;
        const queryResult = sentMessage.rows[0];

        const query = `insert into inbox(message_id,receiver_id) values ($1,$2) returning *`;
        await db.query(query, [messageId, receiverId]);

        result = queryResult;
    }

    return result;
  }

  static async readMessage(id) {
    // check if message exists
    const sql = `select * from messages where id =$1`;
    const { rowCount } = await db.query(sql, [id]);
    if (rowCount > 0) {
      // update status of message to read
      const command = `update inbox set status = $1 where id = $2`;
      await db.query(command, ['read', id]);

      const query = `SELECT inbox.status, inbox.receiver_id, message,subject,
                          parent_message_id, user_id as sender_id, messages.created_on 
                   FROM inbox 
                   LEFT JOIN messages ON inbox.message_id = messages.id where messages.id = $1`;

      const messageResult = await db.query(query, [id]);
      const foundMessage = messageResult.rows[0];
      return foundMessage;
    }

    return false;
  }

  static async getMessages(id, type) {
    let query;
    switch (type) {
      case 'all':
        query = `   SELECT inbox.status, inbox.receiver_id, inbox.message_id, message,
                           subject, parent_message_id, user_id as sender_id, messages.created_on
                    FROM inbox
                    LEFT JOIN messages ON inbox.message_id = messages.id where messages.user_id = $1`;
        break;

      case 'unread':
        query = ` SELECT inbox.message_id as id,inbox.status, inbox.receiver_id,  message, 
                  subject, parent_message_id, user_id as sender_id, messages.created_on FROM inbox
                  LEFT JOIN messages ON inbox.message_id = messages.id where inbox.status = 'unread' and inbox.receiver_id =$1
                  ORDER by inbox.created_on desc`;
        break;

      case 'sent':
        query = `SELECT messages.id,messages.message,subject,messages.status,parent_message_id,inbox.receiver_id, messages.user_id as sender_id, messages.created_on from messages 
        LEFT JOIN inbox on messages.id = inbox.message_id 
        WHERE messages.status = 'sent' and messages.user_id = $1
        ORDER by messages.created_on desc`;
        break;
    }

    const result = await db.query(query, [id]);
    return result.rows;
  }

  static async retractMessage(id, userId) {
    const query = `delete from messages where user_id =$1 and id =$2`;
    const deletedResult = await db.query(query, [userId, id]);
    if (deletedResult.rowCount > 0) return true;
    return false;
  }
}

export default MessageHelper;
