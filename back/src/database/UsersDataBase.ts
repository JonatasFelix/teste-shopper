import { IInputUserDTO, IUserAddressDTO, UserHasAddress } from "../models/Users";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDataBase extends BaseDatabase {
  private static TABLE_USER = "users";
  private static TABLE_ADDRESS = "address";

    public selectUserByEmail = async(email: string): Promise<any> => {
        const result = await BaseDatabase.connection
            .select("*")
            .from(UsersDataBase.TABLE_USER)
            .where({ email });
        return result;
    }

    public updateUserHasAdress = async (id: string, input: UserHasAddress): Promise<void> => {
        await BaseDatabase.connection(UsersDataBase.TABLE_USER)
            .update({has_address: input})
            .where({ id });
    }

    public selectUserByCpf = async(cpf: string): Promise<any> => {
        const result = await BaseDatabase.connection
            .select("*")
            .from(UsersDataBase.TABLE_USER)
            .where({ cpf });
        return result;
    }

    public insertUser = async(data: IInputUserDTO): Promise<void> => {
        await BaseDatabase.connection
            .insert(data)
            .into(UsersDataBase.TABLE_USER);
    }

    public selectUserById = async(id: string): Promise<any> => {
        const result = await BaseDatabase.connection
            .select("*")
            .from(UsersDataBase.TABLE_USER)
            .where({ id });
        return result;
    }

    public insertAddress = async(data: IUserAddressDTO): Promise<void> => {
        await BaseDatabase.connection
            .insert(data)
            .into(UsersDataBase.TABLE_ADDRESS);
    }

    public selectAddressByUserId = async(id: string): Promise<any> => {
        const result = await BaseDatabase.connection
            .select("*")
            .from(UsersDataBase.TABLE_ADDRESS)
            .where({ user_id: id });
        return result;
    }
}