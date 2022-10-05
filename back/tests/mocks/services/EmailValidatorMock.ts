export class EmailValidatorMock {
    private regex = /\S+@\S+\.\S+/

    public validate(email: string): boolean {
        return this.regex.test(email);
    }
    
}