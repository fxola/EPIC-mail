/* eslint-disable no-unused-expressions */
import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL
});

pool.on('connect', () => {
  console.log('connected to the database');
});

pool.on('error', err => {
  console.log(err);
});

/**
 * Create Tables
 */
export const userSchema = async () => {
  const users = `
    CREATE TABLE users (
            id serial primary key NOT NULL,
            first_name varchar(128) NOT NULL,
            last_name varchar(128) NOT NULL,
            email varchar(128) NOT NULL UNIQUE,
            password varchar(128) NOT NULL,
            role integer  DEFAULT '1')
        `;
  await pool
    .query(users)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const messagesSchema = async () => {
  const messages = `
CREATE TABLE messages (
              id serial primary key NOT NULL,
              message varchar(255) NOT NULL,
              subject varchar(255) NOT NULL,
              parent_message_id integer DEFAULT -1 ,
              user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
              updated_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
              status TEXT NOT NULL DEFAULT 'draft')
`;
  await pool
    .query(messages)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const inboxSchema = async () => {
  const inbox = `
CREATE TABLE inbox (
            id serial primary key NOT NULL,
            receiver_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            message_id integer NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
            status TEXT NOT NULL DEFAULT 'unread',
            created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_on TIMESTAMP WITH TIME ZONE DEFAULT now()
            )
`;
  await pool
    .query(inbox)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const conversationSchema = async () => {
  const conversation = `
CREATE TABLE conversation (
            id serial primary key NOT NULL,
            parent_message_id integer DEFAULT -1 REFERENCES messages(id) ON DELETE CASCADE,
            message varchar(255) NOT NULL,
            created_on TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updated_on TIMESTAMP WITH TIME ZONE DEFAULT now()
            )          
`;
  await pool
    .query(conversation)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
