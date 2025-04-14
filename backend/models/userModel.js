const db = require('./db');



exports.getUserByUsernameOrEmail = (username, email) => {
  return db.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
};
exports.getUserByUsername = (username) => db.query('SELECT * FROM users WHERE username = $1', [username]);
exports.createUser = (username, email, password, address, role) => 
  db.query('INSERT INTO users (username, email, password, address, role) VALUES ($1, $2, $3, $4, $5)', [username, email, password, address, role]);
exports.getAllUsers = () => db.query('SELECT * FROM users');
exports.getFilteredUsers = (filters) => {
  const conditions = [];
  const values = [];
  let index = 1;
  for (const key in filters) {
    conditions.push(`${key} ILIKE $${index}`);
    values.push(`%${filters[key]}%`);
    index++;
  }
  const query = `SELECT * FROM users${conditions.length ? ' WHERE ' + conditions.join(' AND ') : ''}`;
  return db.query(query, values);
};
exports.getUserDetails = (id) => db.query('SELECT * FROM users WHERE id = $1', [id]);
