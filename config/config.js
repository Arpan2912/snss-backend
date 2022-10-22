require('dotenv').config();
const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USERNAME, DB_DIALECT } = process.env;
module.exports = {
  "username": DB_USERNAME,
  "password": DB_PASSWORD,
  "database": DB_NAME,
  "host": DB_HOST,
  "dialect": DB_DIALECT
}