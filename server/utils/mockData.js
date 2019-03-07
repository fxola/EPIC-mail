export default {
  users: [
    {
      id: 1,
      firstName: 'Olamide',
      lastName: 'Adeleye',
      email: 'olaade@gmail.com',
      password: 'somepassword'
    },
    {
      id: 2,
      firstName: 'Sururah',
      lastName: 'Imam',
      email: 'suru@gmail.com',
      password: 'anotherpassword',
      contacts: []
    },
    {
      id: 3,
      firstName: 'Fola',
      lastName: 'Ajanaku',
      email: 'fola@gmail.com',
      password: 'anotherone',
      contacts: []
    }
  ],
  contacts: [
    {
      id: 4,
      firstName: 'Shola',
      lastName: 'Adeleye',
      email: 'shola@gmail.com',
      password: 'somepassword'
    },
    {
      id: 5,
      firstName: 'Larry',
      lastName: 'Adeleye',
      email: 'larry@gmail.com',
      password: 'somepassword'
    },
    {
      id: 6,
      firstName: 'Habib',
      lastName: 'Imam',
      email: 'habib@gmail.com',
      password: 'somepassword'
    },
    {
      id: 7,
      firstName: 'Adunni',
      lastName: 'Akanni',
      email: 'adunni@gmail.com',
      password: 'somepassword'
    },
    {
      id: 8,
      firstName: 'Ridwan',
      lastName: 'Ajanaku',
      email: 'rilly@gmail.com',
      password: 'somepassword'
    },
    {
      id: 9,
      firstName: 'Lateef',
      lastName: 'Ajanaku',
      email: 'latty@gmail.com',
      password: 'somepassword'
    }
  ],
  messages: [
    {
      id: 20,
      createdOn: 'Thu Mar 07 2019 12:06:36 GMT+0100 (West Africa Standard Time)',
      subject: 'Welcome To EPIC mail',
      message: `Message Body Lorem ipsum dolor sit amet con
                sectetur adipisicing elit. Consectetur aspernatur 
                vitae nobis distinctio necessitatibus!`,
      senderId: null,
      recieverId: null,
      parentMessageId: null,
      status: 'draft'
    },
    {
      id: 21,
      createdOn: 'Thu Mar 07 2019 12:06:36 GMT+0100 (West Africa Standard Time)',
      subject: 'Super Important Stuff',
      message: `Message Body Lorem ipsum dolor sit amet con
                sectetur adipisicing elit. Consectetur aspernatur 
                vitae nobis distinctio necessitatibus!`,
      senderId: 1,
      recieverId: 3,
      parentMessageId: null,
      status: 'sent'
    },
    {
      id: 22,
      createdOn: 'Thu Mar 07 2019 12:06:36 GMT+0100 (West Africa Standard Time)',
      subject: 'Super Important Stuff',
      message: `Message Body Lorem ipsum dolor sit amet con
                sectetur adipisicing elit. Consectetur aspernatur 
                vitae nobis distinctio necessitatibus!`,
      senderId: 3,
      recieverId: 1,
      parentMessageId: 21,
      status: 'sent'
    },

    {
      id: 22,
      createdOn: 'Thu Mar 07 2019 12:06:36 GMT+0100 (West Africa Standard Time)',
      subject: 'Super Important Stuff',
      message: `Message Body Lorem ipsum dolor sit amet con
                sectetur adipisicing elit. Consectetur aspernatur 
                vitae nobis distinctio necessitatibus!`,
      senderId: 3,
      recieverId: 1,
      parentMessageId: 21,
      status: 'read'
    }
  ]
};
