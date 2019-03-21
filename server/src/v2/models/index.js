import {
  userSchema,
  messagesSchema,
  inboxSchema,
  conversationSchema,
  groupSchema,
  groupMembersSchema
} from './migrate';

(async () => {
  try {
    await userSchema();
    await messagesSchema();
    await inboxSchema();
    await conversationSchema();
    await groupSchema();
    await groupMembersSchema();
  } catch (error) {
    console.log(error);
  }
})();
