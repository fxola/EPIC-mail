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

/**
 * Drop Tables
 */
const dropTable = queryText => {
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      //   return pool.end();
    })
    .catch(err => {
      console.log(err);
      //   return pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

const QueryText = 'DROP TABLE IF EXISTS users, messages, inbox, sent, conversation';
dropTable(QueryText);
