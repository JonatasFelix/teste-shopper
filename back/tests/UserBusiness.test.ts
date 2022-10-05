import { UserBusiness } from "../src/business/UserBusiness";
import { IUserLoginInputDTO, IUserSignupInputDTO } from "../src/models/User";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { HashManagerMock } from "./mocks/HashManagerMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { EmailValidatorMock } from "./mocks/services/EmailValidatorMock";
import { UserDatabaseMock } from "./mocks/UserDatabaseMock";

describe("Teste UserBusiness", () => {

    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock(),
        new EmailValidatorMock()

    )

    test("Teste de signup", async () => {
     
        const result = await userBusiness.signup({
            name: "name_mock",
            email: "email_mock4@gmail.com",
            password: "password_mock"
        })

        expect(result).toBe("token-mock-normal")

    });

    test("Teste de login", async () => {
        const result = await userBusiness.login({
            email: "email_mock2@gmail.com",
            password: "bananinha"
        })

        expect(result).toBe("token-mock-normal")
    });


    test("Teste de signup sem parâmetros", async () => {
        expect.assertions(2)
        const input: IUserSignupInputDTO = {} as unknown as IUserSignupInputDTO

        try {
            await userBusiness.signup(input)
        } catch (error) {
            expect(error.message).toBe("name, email and password are required")
            expect(error.statusCode).toBe(422)
        }
    });
    
    test("Teste de signup com nome com menos de 3 caracteres", async () => {
        expect.assertions(2)
        try {
            await userBusiness.signup({
                name: "na",
                email: "jonatas@gmail.com",
                password: "123456"
            })
        } catch (error) {
            expect(error.message).toBe("name must have at least 3 characters")
            expect(error.statusCode).toBe(400)
        }
    });

    test("Teste de signup com email inválido", async () => {
        expect.assertions(2)
        try {
            await userBusiness.signup({
                name: "jonatas",
                email: "jonatas",
                password: "123456"
            })
        } catch (error) {
            expect(error.message).toBe("Invalid email")
            expect(error.statusCode).toBe(400)
        }
    });

    test("Teste de signup com senha com menos de 6 caracteres", async () => {
        expect.assertions(2)
        try {
            await userBusiness.signup({
                name: "jonatas",
                email: "jonatas@gmail.com",
                password: "12345"
            })
        } catch (error) {
            expect(error.message).toBe("password must have at least 6 characters")
            expect(error.statusCode).toBe(400)
        }
    });

    test("Teste de signup com email já cadastrado", async () => {
        expect.assertions(2)
        try {
            await userBusiness.signup({
                name: "jonatas",
                email: "email_mock@gmail.com",
                password: "123456"
            })
        } catch (error) {
            expect(error.message).toBe("Email already registered")
            expect(error.statusCode).toBe(409)
        }
    });

    test("Teste de signup com valor diferente de string", async () => {
        expect.assertions(2)

        const input: IUserSignupInputDTO = {
            name: 123456,
            email: "jonatas@gmail.com",
            password: "123456"
        } as unknown as IUserSignupInputDTO

        try {
            await userBusiness.signup(input)
        } catch (error) {
            expect(error.message).toBe("name, email and password must be strings")
            expect(error.statusCode).toBe(400)
        }
    });


    test("Teste de login sem parâmetros", async () => {
        expect.assertions(2)
        const input: IUserLoginInputDTO = {} as unknown as IUserLoginInputDTO

        try {
            await userBusiness.login(input)
        } catch (error) {
            expect(error.message).toBe("email and password are required")
            expect(error.statusCode).toBe(422)
        }
    });

    test("Teste de login com parâmetros diferentes de string", async () => {
        expect.assertions(2)
        const input: IUserLoginInputDTO = {
            email: 123456,
            password: 123456
        } as unknown as IUserLoginInputDTO

        try {
            await userBusiness.login(input)
        } catch (error) {
            expect(error.message).toBe("email and password must be strings")
            expect(error.statusCode).toBe(400)
        }
    });

    test("Teste de login com email inválido", async () => {
        expect.assertions(2)
        try {
            await userBusiness.login({
                email: "jonatas",
                password: "123456"
            })
        } catch (error) {
            expect(error.message).toBe("Invalid email")
            expect(error.statusCode).toBe(400)
        }
    });

    test("Teste de login com senha menor que 6 caracteres", async () => {
        expect.assertions(2)
        try {
            await userBusiness.login({
                email: "email_mock@gmail.com",
                password: "12345"
            })
        } catch (error) {
            expect(error.message).toBe("password must have at least 6 characters")
            expect(error.statusCode).toBe(400)
        }
    });

    test("Teste de login com email não cadastrado", async () => {
        expect.assertions(2)
        try {
            await userBusiness.login({
                email: "jonatas@gmail.com",
                password: "1234567"
            })
        } catch (error) {
            expect(error.message).toBe("email not registered")
            expect(error.statusCode).toBe(404)
        }
    });

    test("Teste de login com senha incorreta", async () => {
        expect.assertions(2)
        try {
            await userBusiness.login({
                email: "email_mock@gmail.com",
                password: "12345678"
            })
        } catch (error) {
            expect(error.message).toBe("Invalid password")
            expect(error.statusCode).toBe(401)
        }
    });

});