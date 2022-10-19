import { UsersBusiness } from "../src/business/UsersBusiness";
import { IInputUserLogin, IInputUserSignUp, IUserAddress } from "../src/models/Users";
import { AuthenticatorMock } from "./mocks/services/AuthenticatorMock";
import { CpfValidatorMock } from "./mocks/services/CpfValidatorMock";
import { EmailValidatorMock } from "./mocks/services/EmailValidatorMock";
import { HashManagerMock } from "./mocks/services/HashManagerMock";
import { IdGeneratorMock } from "./mocks/services/IdGeneratorMock";
import { UsersDataBaseMock } from "./mocks/UserDatabaseMock";

describe("Testes UsersDataBase", () => {

    const usersBusiness = new UsersBusiness(
        new UsersDataBaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock(),
        new EmailValidatorMock(),
        new CpfValidatorMock()
    )


    // signup

    test("Teste de cadastro de usuário", async () => {
        const input: IInputUserSignUp = {
            name: "name",
            email: "email@gmail.com",
            password: "password",
            cpf: "22222222222"
        }

        const result = await usersBusiness.signup(input)

        expect(result).toBe("invalid_token")
    });

    test("Teste de cadastro de usuário, faltando um campo", async () => {
        expect.assertions(2)

        const input: IInputUserSignUp = {
            name: "name",
            email: "",
            password: "password",
            cpf: "22222222222"
        }

        try {
            await usersBusiness.signup(input)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("name, email, password e cpf são obrigatórios")
        }
    });

    test("Teste de cadastro de usuário, com nome inválido", async () => {
        expect.assertions(2)

        const input: IInputUserSignUp = {
            name: "na",
            email: "email@gmail.com",
            password: "password",
            cpf: "22222222222"
        }

        try {
            await usersBusiness.signup(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Nome deve ser uma string com no mínimo 3 caracteres")

        }
    });

    test("Teste de cadastro de usuário, com email inválido", async () => {
        expect.assertions(2)

        const input: IInputUserSignUp = {
            name: "name",
            email: "invalid_email",
            password: "password",
            cpf: "22222222222"
        }

        try {
            await usersBusiness.signup(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Email inválido")

        }
    });

    test("Teste de cadastro de usuário, com senha inválida", async () => {
        expect.assertions(2)

        const input: IInputUserSignUp = {
            name: "name",
            email: "email@gmail.com",
            password: "pa",
            cpf: "22222222222"
        }

        try {
            await usersBusiness.signup(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Senha deve ter no mínimo 6 caracteres")

        }
    });

    test("Teste de cadastro de usuário, com cpf inválido", async () => {
        expect.assertions(2)

        const input: IInputUserSignUp = {
            name: "name",
            email: "email@gmail.com",
            password: "password",
            cpf: "11111111111"
        }

        try {
            await usersBusiness.signup(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("CPF inválido")

        }
    });

    test("Teste de cadastro de usuário, com email já cadastrado", async () => {
        expect.assertions(2)

        const input: IInputUserSignUp = {
            name: "name",
            email: "valid@email.com",
            password: "password",
            cpf: "22222222222"
        }

        try {
            await usersBusiness.signup(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Email já cadastrado")

        }
    });

    test("Teste de cadastro de usuário, com cpf já cadastrado", async () => {
        expect.assertions(2)

        const input: IInputUserSignUp = {
            name: "name",
            email: "email@gmail.com",
            password: "password",
            cpf: "12345678910"
        }

        try {
            await usersBusiness.signup(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("CPF já cadastrado")

        }

    });

    // login

    test("Teste de login de usuário", async () => {
        const input: IInputUserLogin = {
            email: "valid@email.com",
            password: "password"
        }

        const result = await usersBusiness.login(input)

        expect(result).toBe("invalid_token")
    });

    test("Teste de login de usuário, faltando um campo", async () => {
        expect.assertions(2)

        const input: IInputUserLogin = {
            email: "",
            password: "password"
        }

        try {
            await usersBusiness.login(input)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("email e password são obrigatórios")
        }
    });

    test("Teste de login de usuário, com email inválido", async () => {
        expect.assertions(2)

        const input: IInputUserLogin = {
            email: "invalid_email",
            password: "password"
        }

        try {
            await usersBusiness.login(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Email inválido")

        }
    });

    test("Teste de login de usuário, com senha inválida", async () => {
        expect.assertions(2)

        const input: IInputUserLogin = {
            email: "valid@email.com",
            password: "pa"
        }

        try {
            await usersBusiness.login(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Senha deve ter no mínimo 6 caracteres")

        }
    });

    test("Teste de login de usuário, com email não cadastrado", async () => {
        expect.assertions(2)

        const input: IInputUserLogin = {
            email: "email@gmail.com",
            password: "password"
        }

        try {
            await usersBusiness.login(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Email ou senha incorretos")

        }
    });


    test("Teste de login de usuário, com senha incorreta", async () => {
        expect.assertions(2)

        const input: IInputUserLogin = {
            email: "valid@email.com",
            password: "invalid_password"
        }

        try {
            await usersBusiness.login(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Email ou senha incorretos")

        }
    });


    // addAddress

    test("Teste de adicionar endereço", async () => {
        const input: IUserAddress = {
            cep: "12345678",
            street: "street",
            number: "1",
            neighbourhood: "neighbourhood",
            city: "city",
            state: "state",
            token: "noAddress_token"
        }

        const result = await usersBusiness.addAddress(input)

        expect(result).toBe("invalid_token")
    });

    test("Teste de adicionar endereço, faltando um campo", async () => {
        expect.assertions(2)

        const input: IUserAddress = {
            cep: "12345678",
            street: "street",
            number: "1",
            neighbourhood: "neighbourhood",
            city: "city",
            state: "state",
            token: ""
        }

        try {
            await usersBusiness.addAddress(input)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("cep, street, number, neighbourhood, city, state e token são obrigatórios")
        }
    });


    test("Teste de adicionar endereço, com cep inválido", async () => {
        expect.assertions(2)

        const input: IUserAddress = {
            cep: "1234567",
            street: "street",
            number: "1",
            neighbourhood: "neighbourhood",
            city: "city",
            state: "state",
            token: "noAddress_token"
        }

        try {
            await usersBusiness.addAddress(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("CEP inválido")

        }
    });

    test("Teste de adicionar endereço, com token inválido", async () => {
        expect.assertions(2)

        const input: IUserAddress = {
            cep: "12345678",
            street: "street",
            number: "1",
            neighbourhood: "neighbourhood",
            city: "city",
            state: "state",
            token: "invalid_token"
        }

        try {
            await usersBusiness.addAddress(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Token inválido")

        }
    });

    test("Teste de adicionar endereço, com token valido, mas não cadastrado", async () => {
        expect.assertions(2)

        expect.assertions(2)

        const input: IUserAddress = {
            cep: "12345678",
            street: "street",
            number: "1",
            neighbourhood: "neighbourhood",
            city: "city",
            state: "state",
            token: "valid-token-noUser"
        }

        try {
            await usersBusiness.addAddress(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Usuário não encontrado")

        }
    });



    test("Teste de adicionar endereço, com token de usuário com endereço", async () => {
        expect.assertions(2)

        const input: IUserAddress = {
            cep: "12345678",
            street: "street",
            number: "1",
            neighbourhood: "neighbourhood",
            city: "city",
            state: "state",
            token: "valid_token"
        }

        try {
            await usersBusiness.addAddress(input)
        }
        catch (error) {
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Usuário já possui endereço cadastrado, caso queira alterar, utilize o endpoint de alteração de endereço")

        }
    });

    // getAddress

    test("Teste de pegar endereço", async () => {
        const token = "valid_token"

        const result = await usersBusiness.getAddress(token)

        expect(result).toEqual({
            street: 'street',
            number: 'number',
            neighbourhood: 'neighbourhood',
            city: 'city',
            state: 'state',
            complement: 'complement',
            cep: "54759130"
        })
    });

    test("Teste de pegar endereço, sem token", async () => {
        expect.assertions(2)

        const token = ""

        try {
            await usersBusiness.getAddress(token)
        }
        catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("token é obrigatório")

        }
    });

    test("Teste de pegar endereço, com token inválido", async () => {
        expect.assertions(2)

        const token = "invalid_token"

        try {
            await usersBusiness.getAddress(token)
        }
        catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Token inválido")

        }
    });

    test("Teste de pegar endereço, com token válido, mas não cadastrado", async () => {
        expect.assertions(2)

        const token = "valid-token-noUser"

        try {
            await usersBusiness.getAddress(token)
        }
        catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Usuário não encontrado")

        }
    });

    test("Teste de pegar endereço, com token de usuário sem endereço", async () => {
        expect.assertions(2)

        const token = "noAddress_token"

        try {
            await usersBusiness.getAddress(token)
        }
        catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Usuário não possui endereço cadastrado")

        }
    });

});