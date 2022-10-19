import { IInputUserDTO, IUserAddressDTO, UserHasAddress } from "../../src/models/Users";


export class UsersDataBaseMock {
    private static TABLE_USER = "users";
    private static TABLE_ADDRESS = "address";

    public insertAddress = async (data: IUserAddressDTO): Promise<void> => { }
    public updateUserHasAdress = async (id: string, input: UserHasAddress): Promise<void> => { }
    public insertUser = async (data: IInputUserDTO): Promise<void> => { }


    public selectUserByEmail = async (email: string): Promise<any> => {
        switch (email) {
            case 'valid@email.com':
                return [
                    {
                        id: 'id1',
                        name: 'name',
                        email: 'valid@email.com',
                        password: 'password',
                        role: 'NORMAL',
                        has_address: 'HAVE',
                        cpf: '12345678910',
                        status: 'ACTIVE'
                    }
                ]
            default:
                return []
        }
    }

    public selectUserByCpf = async (cpf: string): Promise<any> => {

        switch (cpf) {
            case '12345678910':
                return [
                    {
                        id: 'id1',
                        name: 'name',
                        email: 'valid@email.com',
                        password: 'password',
                        role: 'NORMAL',
                        has_address: 'HAVE',
                        cpf: '12345678910',
                        status: 'ACTIVE'
                    }
                ]
        default: 
            return []
            }
    }

    public selectUserById = async (id: string): Promise<any> => {

        switch (id) {
            case "id_noAddress":
                return [
                    {
                        id: 'id_noAddress',
                        name: 'name',
                        email: 'email',
                        password: 'password',
                        role: 'NORMAL',
                        has_address: 'false',
                        cpf: '12345678910',
                        status: 'ACTIVE'
                    }
                ]
            case "noUser":
                return []
            default:
                return [
                    {
                        id: 'id1',
                        name: 'name',
                        email: 'valid@email.com',
                        password: 'password',
                        role: 'NORMAL',
                        has_address: 'true',
                        cpf: '12345678910',
                        status: 'ACTIVE'
                    }
                ]
        }
    }

    public selectAddressByUserId = async (id: string): Promise<any> => {
        return [
            {
                id: 'id1',
                street: 'street',
                number: 'number',
                neighbourhood: 'neighbourhood',
                city: 'city',
                state: 'state',
                complement: 'complement',
                user_id: 'id1',
                cep: "54759130"
            }
        ]
    }
}