import BaseError from "./BaseError";

class MissingParameters extends BaseError {
    constructor(message: string) {
        super(`${message} are required`, 422);
    }
}

export default MissingParameters;