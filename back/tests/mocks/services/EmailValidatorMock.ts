export class EmailValidatorMock {
    public validate(email: string): boolean {
        switch (email) {
            case 'invalid_email':
                return false;
            default:
                return true
        }

    }
}
