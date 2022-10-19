
import { IUserAddressDTO, UserHasAddress, UserRole, UserStatus } from '../../../src/models/Users';


export class ITokenPayload {
    name: string
    email: string
    id: string
    role: UserRole
    hasAddress: UserHasAddress
    status: UserStatus
    address?: IUserAddressDTO | undefined
}

export class AuthenticatorMock {
    generateToken = (payload: ITokenPayload): string => {
        switch (payload.name) {
            case 'normal':
                return 'valid_token';
            case 'noAddress':
                return 'noAddress_token';
            case 'valid-token-noUser':
                return 'valid-token-noUser';
            default:
                return 'invalid_token';
        }
    }

    getTokenPayload = (token: string): ITokenPayload | null => {
        switch (token) {
            case 'valid_token':
                return {
                    name: 'name',
                    email: 'email',
                    id: 'id1',
                    role: UserRole.NORMAL,
                    hasAddress: UserHasAddress.HAVE,
                    status: UserStatus.ACTIVE
                }
            case 'invalid_token':
                return null
            case 'valid-token-noUser':
                return {
                    name: 'name',
                    email: 'email',
                    id: 'noUser',
                    role: UserRole.NORMAL,
                    hasAddress: UserHasAddress.HAVE,
                    status: UserStatus.ACTIVE
                }
            case 'noBuys_token':
                return {
                    name: 'name',
                    email: 'email',
                    id: 'id2',
                    role: UserRole.NORMAL,
                    hasAddress: UserHasAddress.HAVE,
                    status: UserStatus.ACTIVE
                }
            case 'noAddress_token':
                return {
                    name: 'name',
                    email: 'email',
                    id: 'id_noAddress',
                    role: UserRole.NORMAL,
                    hasAddress: UserHasAddress.DONT_HAVE,
                    status: UserStatus.ACTIVE
                }
            default:
                return null
        }
    }
}