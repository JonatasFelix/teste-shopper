export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        return "password_hashed"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        switch (plaintext) {
            case 'invalid_password':
                return false;
            default:
                return true;
        }
    }
}