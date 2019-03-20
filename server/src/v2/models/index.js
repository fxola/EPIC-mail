import { userSchema, messagesSchema, inboxSchema, conversationSchema } from './migrate';

(async () => {
  try {
    await userSchema();
    await messagesSchema();
    await inboxSchema();
    await conversationSchema();
  } catch (error) {
    console.log(error);
  }
})();
