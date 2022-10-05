import BaseError from "./BaseError";

class BadRequest extends BaseError {
    constructor(message: string) {
        super(`${message}`, 400);
    }
}

export default BadRequest;