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
const createTable = queryText => {
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const usersQueryText = `CREATE TABLE IF NOT EXISTS
users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(128) NOT NULL,
  last_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  password VARCHAR(128) NOT NULL,
  role INT NOT NULL,
  created_on TIMESTAMP,
  updated_on TIMESTAMP
)`;
createTable(usersQueryText);

const messagesQueryText = `CREATE TABLE IF NOT EXISTS
messages(
  id SERIAL PRIMARY KEY,
  subject VARCHAR(128) NOT NULL,
  message VARCHAR(128) NOT NULL,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  parent_message_id INT NOT NULL,
  status INT NOT NULL,
  created_on TIMESTAMP,
  updated_on TIMESTAMP
)`;
createTable(messagesQueryText);
