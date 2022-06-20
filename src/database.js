import mysql from 'mysql2/promise.js';

const dbURI = process.env.DB_URI;

// Create the connection pool. The pool-specific settings are the defaults
const database = mysql.createPool({
  uri: dbURI,
  namedPlaceholders: true,
  connectionLimit: 10,
  maxPreparedStatements: 25,
});

export const removeUndefinedFilters = (query, replacements) => {
  const keysWithValue = Object.entries(replacements)
    .filter(([, value]) => value !== undefined)
    .map(([key]) => key);

  const newQuery = query
    .split('\n')
    .filter((x) => {
      // query part with a param
      if (x.includes(':')) {
        return keysWithValue.some((k) => x.includes(k));
      }
      return x;
    })
    .join(' ');

  return newQuery;
};

export const getColumnsForInsert = (values) => {
  const keysWithValue = Object.entries(values)
    .filter(([, value]) => value !== undefined)
    .map(([key]) => key);
  return keysWithValue;
};

export default database;
