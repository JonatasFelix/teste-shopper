import BaseError from "./BaseError";

class NotFound extends BaseError {
    constructor(message: string) {
        super(message, 404);
    }
}

export default NotFound;