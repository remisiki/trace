/**
 * Basic exception extending built-in error
 */
export class BaseException extends Error {
  constructor(message?: string) {
    super(message);
    // ES5
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
