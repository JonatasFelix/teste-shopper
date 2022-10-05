import { BaseDatabase } from "../../src/database/BaseDatabase"
import { IUserDB, USER_ROLES } from "../../src/models/User"

const users: IUserDB[] = [
    {
        id: "id_mock",
        name: "name_mock",
        email: "email_mock@gmail.com",
        password: "password_mock",
        role: USER_ROLES.NORMAL
    },
    {
        id: "id_mock2",
        name: "name_mock2",
        email: "email_mock2@gmail.com",
        password: "hash-bananinha",
        role: USER_ROLES.NORMAL
    },
    {
        id: "id_mock3",
        name: "name_mock3",
        email: "email_mock3@gmail.com",
        password: "hash-bananinha",
        role: USER_ROLES.ADMIN
    },
]


export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "Lama_Users"

    public insertUser = async (input: IUserDB): Promise<void> => {}

    public selectUserByEmail = async (email: string): Promise<any> => {
        return users.filter(user => user.email === email)
    }

}