import BaseError from "./BaseError";

class Unauthorized extends BaseError {
    constructor(message: string) {
        super(message, 401);
    }
}

export default Unauthorized;