import { UsersDataBase } from "../database/UsersDataBase";
import BadRequest from "../errors/BadRequest";
import Conflict from "../errors/Conflict";
import MissingParameters from "../errors/MissingParameters";
import Unauthorized from "../errors/Unauthorized";
import { IInputUserDTO, IInputUserLogin, IInputUserSignUp, IUserAddress, IUserAddressDTO, UserHasAddress, UserRole, UserStatus } from "../models/Users";
import { Authenticator, ITokenPayload } from "../services/AuthenticatorData";
import { CpfValidator } from "../services/CpfValidator";
import { EmailValidator } from "../services/EmailValidator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class UsersBusiness {
  constructor(
    private usersDataBase: UsersDataBase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private authenticator: Authenticator,
    private emailValidator: EmailValidator,
    private cpfValidator: CpfValidator
  ) { }

    public signup = async (input: IInputUserSignUp): Promise<string> => {

        const { name, email, password, cpf } = input

        if (!name || !email || !password || !cpf) {
            throw new MissingParameters("name, email, password e cpf são obrigatórios")
        }

        if(typeof name !== "string" || name.length < 3) {
            throw new BadRequest("Nome deve ser uma string com no mínimo 3 caracteres")
        }

        if (!this.emailValidator.validate(email)) {
            throw new BadRequest("Email inválido")
        }

        if (password.length < 6) {
            throw new BadRequest("Senha deve ter no mínimo 6 caracteres")
        }

        if (!this.cpfValidator.CpfChecker(cpf)) {
            throw new BadRequest("CPF inválido")
        }

        const emailIsAlreadyRegistered = await this.usersDataBase.selectUserByEmail(email)

        if (emailIsAlreadyRegistered.length) {
            throw new Conflict("Email já cadastrado")
        }


        const cpfReplace: string = cpf.toString().replace(/[^0-9]/g, "")
        const cpfIsAlreadyRegistered = await this.usersDataBase.selectUserByCpf(cpfReplace)

        if (cpfIsAlreadyRegistered.length) {
            throw new Conflict("CPF já cadastrado")
        }


        const id: string = this.idGenerator.generate()
        const status: UserStatus = UserStatus.ACTIVE
        const role: UserRole = UserRole.NORMAL
        const hasAddress: UserHasAddress = UserHasAddress.DONT_HAVE
        const hashPassword: string = await this.hashManager.hash(password)

        const data: IInputUserDTO = {
            id,
            name,
            email,
            password: hashPassword,
            role,
            cpf: cpfReplace,
            status,
            has_address: hasAddress
    }

        await this.usersDataBase.insertUser(data)

        const payload: ITokenPayload = { id, role, hasAddress, status, name, email }

        const token: string = this.authenticator.generateToken(payload)

        return token


    }


    public login = async (input: IInputUserLogin): Promise<string> => {
            
            const { email, password } = input
    
            if (!email || !password) {
                throw new MissingParameters("email e password são obrigatórios")
            }
    
            if (!this.emailValidator.validate(email)) {
                throw new BadRequest("Email inválido")
            }
    
            if (password.length < 6) {
                throw new BadRequest("Senha deve ter no mínimo 6 caracteres")
            }
    
            const user: any = await this.usersDataBase.selectUserByEmail(email)
    
            if (!user.length) {
                throw new BadRequest("Email ou senha incorretos")
            }
    
            const passwordIsCorrect: boolean = await this.hashManager.compare(password, user[0].password)
    
            if (!passwordIsCorrect) {
                throw new BadRequest("Email ou senha incorretos")
            }

            let userAddress

           if(user[0].has_address === UserHasAddress.HAVE) {
                userAddress = await this.usersDataBase.selectAddressByUserId(user[0].id)
                userAddress = {
                    street: userAddress[0].street as string,
                    number: userAddress[0].number as string,
                    complement: userAddress[0].complement as string,
                    neighbourhood: userAddress[0].neighbourhood as string,
                    city: userAddress[0].city as string,
                    state: userAddress[0].state as string,
                    cep: userAddress[0].cep as string
                }
           }
    
            const payload: ITokenPayload = {
                name: user[0].name as string,
                email: user[0].email as string,
                id: user[0].id,
                role: user[0].role,
                hasAddress: user[0].has_address,
                status: user[0].status,
                address: userAddress
            }
    
            const token: string = this.authenticator.generateToken(payload)
    
            return token
    
        }

        public addAddress = async (input: IUserAddress): Promise<string> => {
            const { cep, street, number, complement, neighbourhood, city, state, token } = input

            if (!cep || !street || !number || !neighbourhood || !city || !state || !token) {
                throw new MissingParameters("cep, street, number, neighbourhood, city, state e token são obrigatórios")
            }

            if (cep.length < 8) {
                throw new BadRequest("CEP inválido")
            }

            const tokenData: ITokenPayload = this.authenticator.getTokenPayload(token)

            if (!tokenData) {
                throw new Unauthorized("Token inválido")
            }

            const user: any = await this.usersDataBase.selectUserById(tokenData.id)

            if (!user.length) {
                throw new Unauthorized("Usuário não encontrado")
            }

            if (user[0].has_address === UserHasAddress.HAVE) {
                throw new Conflict("Usuário já possui endereço cadastrado, caso queira alterar, utilize o endpoint de alteração de endereço")
            }

            const id: string = this.idGenerator.generate()

            const data: IUserAddressDTO = {
                cep,
                street,
                number,
                complement,
                neighbourhood,
                city,
                state,
                user_id: tokenData.id,
                id
            }

            await this.usersDataBase.insertAddress(data)
            await this.usersDataBase.updateUserHasAdress(tokenData.id, UserHasAddress.HAVE)

            const newToken = this.authenticator.generateToken({
                name: tokenData.name,
                email: tokenData.email,
                id: tokenData.id,
                role: tokenData.role,
                hasAddress: UserHasAddress.HAVE,
                status: tokenData.status,
                address: { ...data, user_id: "", id: "" }
            })

            return newToken
        }


        public getAddress = async (token: string): Promise<IUserAddressDTO> => {

            if(!token) {
                throw new MissingParameters("token é obrigatório")
            }

            const tokenData: ITokenPayload = this.authenticator.getTokenPayload(token)

            if (!tokenData) {
                throw new Unauthorized("Token inválido")
            }

            const user: any = await this.usersDataBase.selectUserById(tokenData.id)

            if (!user.length) {
                throw new Unauthorized("Usuário não encontrado")
            }

            if (user[0].has_address === UserHasAddress.DONT_HAVE) {
                throw new Unauthorized("Usuário não possui endereço cadastrado")
            }

            const address: any = await this.usersDataBase.selectAddressByUserId(tokenData.id)

            const data: IUserAddressDTO = {
                cep: address[0].cep as string,
                street: address[0].street as string,
                number: address[0].number as string,
                complement: address[0].complement as string,
                neighbourhood: address[0].neighbourhood as string,
                city: address[0].city as string,
                state: address[0].state as string
            }

            return data
        }

}