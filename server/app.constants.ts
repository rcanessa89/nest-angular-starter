export const DB_TYPE = 'mysql';
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const PASSWORD_SALT = 10;
export const BROWSER_CLIENT_DIR = 'dist/client-browser';
export const BROWSER_SERVER_DIR = 'dist/client-server/main.js';
export const AUTH_GUARD_TYPE = 'jwt';
// PASSWORD_REGEX Minimum 6 characters, at least one uppercase letter, one lowercase letter and one number
// eslint-disable-next-line
export const PASSWORD_REGEX =
  '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
