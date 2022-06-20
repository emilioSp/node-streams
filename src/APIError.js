export default class APIError extends Error {
  constructor({ message, http_code }) {
    super(message);
    this.http_code = http_code;
    this.error_message = message;
  }
}
