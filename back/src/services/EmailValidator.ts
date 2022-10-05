import * as Validator from 'email-validator';

export class EmailValidator {
    public validate(email: string): boolean {
        return Validator.validate(email);
    }
}
