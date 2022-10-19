export enum UserRole {
    ADMIN = 'admin',
    NORMAL = 'normal'
}

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum UserHasAddress {
    DONT_HAVE = 'false',
    HAVE = 'true'
}

export interface IInputUserSignUp {
    name: string;
    email: string;
    password: string;
    cpf: string;
}

export interface IInputUserDTO extends IInputUserSignUp {
    id: string;
    role: UserRole;
    status: UserStatus;
    has_address: UserHasAddress;
}

export interface IUserAddressDTO {
    street: string;
    number: string;
    complement?: string;
    neighbourhood: string;
    city: string;
    state: string;
    cep: string;
    user_id?: string;
    id?: string;
}

export interface IUserAddress extends IUserAddressDTO {
    token: string;
}

export interface IInputUserLogin {
    email: string;
    password: string;
}