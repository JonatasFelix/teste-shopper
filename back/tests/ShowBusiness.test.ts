import { ShowBusiness } from "../src/business/ShowBusiness";
import { IBuyTicketInputDTO, IShowInputDTO } from "../src/models/Show";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { ShowDatabaseMock } from "./mocks/ShowDatabaseMock";

describe("Teste ShowBusiness", () => {

    const showBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock(),
    )

    test("Teste criar um show", async () => {
        const input: IShowInputDTO = {
            token: "token-mock-admin",
            band: "band5",
            startAt: new Date("2022-12-09")
        }

        const result = await showBusiness.createShow(input)

        expect(result).toBe(true)
    });


    test("Teste pegar lista de shows", async () => {
        const result = await showBusiness.getShowsList("token-mock-normal")
        expect(result.length).toBe(5)
    });

    test("Teste comprar ingresso", async () => {
        const input = {
            token: "token-mock-normal",
            showId: "id3"
        }

        const result = await showBusiness.buyTicket(input)
        expect(result).toBe(true)
    });

    test("Teste cancelar compra de ingresso", async () => {
        const input: IBuyTicketInputDTO = {
            token: "token-mock-normal",
            showId: "id1"
        }

        const result = await showBusiness.cancelBuyTicket(input)
        expect(result).toBe(true)
    });


    test("Teste de erro ao criar um show sem parâmetros", async () => {
        expect.assertions(2)

        const input: IShowInputDTO = {} as unknown as IShowInputDTO

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("token, band and startAt are required")
        }
    });

    test("Teste de erro ao criar um show com parâmetros diferentes de string", async () => {
        expect.assertions(2)

        const input: IShowInputDTO = {
            token: 123,
            band: 123,
            startAt: 123
        } as unknown as IShowInputDTO

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("token and band must be strings")
        }
    });

    test("Teste de erro ao criar um show com token inválido", async () => {
        expect.assertions(2)

        const input: IShowInputDTO = {
            token: "token-invalido",
            band: "band1",
            startAt: new Date("2022-12-08")
        }

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Invalid token")
        }
    });

    test("Teste de erro ao criar um show com token de usuário normal", async () => {
        expect.assertions(2)

        const input: IShowInputDTO = {
            token: "token-mock-normal",
            band: "band1",
            startAt: new Date("2022-12-08")
        }

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Only admins can create shows")
        }
    });

    test("Teste de erro ao criar um show com data inválida", async () => {
        expect.assertions(2)

        const input: IShowInputDTO = {
            token: "token-mock-admin",
            band: "band1",
            startAt: "2/05-122"
        } as unknown as IShowInputDTO

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Invalid date format - use DD/MM/YYYY")
        }
    });

    test("Teste de erro ao criar um show com data menor que 05/12/2022", async () => {
        expect.assertions(2)

        const input: IShowInputDTO = {
            token: "token-mock-admin",
            band: "band1",
            startAt: new Date("2022-12-04")
        }

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Date must be after 05/12/2022")
        }
    });

    test("Teste de erro ao criar um show com data já existente", async () => {
        expect.assertions(2)

        const input: IShowInputDTO = {
            token: "token-mock-admin",
            band: "band1",
            startAt: new Date("2022-12-06")
        }

        try {
            await showBusiness.createShow(input)
        } catch (error) {
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Date already exists")
        }
    });

    test("Teste de erro ao pegar lista sem parâmetros", async () => {
        expect.assertions(2)

        try {
            await showBusiness.getShowsList("")
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("token are required")
        }
    });

    test("Teste de erro ao pegar lista com parâmetro diferente de string", async () => {
        expect.assertions(2)
        const input = 123 as unknown as string

        try {
            await showBusiness.getShowsList(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("token must be a string")
        }
    });

    test("Teste de erro ao pegar lista com token inválido", async () => {
        expect.assertions(2)

        try {
            await showBusiness.getShowsList("token-invalido")
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Invalid token")
        }
    });

    test("Teste de erro ao comprar ingresso sem parâmetros", async () => {
        expect.assertions(2)

        const input = {} as unknown as IBuyTicketInputDTO

        try {
            await showBusiness.buyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("token and showId are required")
        }
    });

    test("Teste de erro ao comprar ingresso com parâmetros diferentes de string", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: 123,
            showId: 123
        } as unknown as IBuyTicketInputDTO

        try {
            await showBusiness.buyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("token and showId must be strings")
        }
    });

    test("Teste de erro ao comprar ingresso com token inválido", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: "token-invalido",
            showId: "id4"
        }

        try {
            await showBusiness.buyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Invalid token")
        }
    });

    test("Teste de erro ao comprar ingresso de um show que não existe", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: "token-mock-normal",
            showId: "invalid-id"
        }

        try {
            await showBusiness.buyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Show not found")
        }
    });

    test("Teste de erro ao comprar ingresso de um show que já comprei", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: "token-mock-normal",
            showId: "id1"
        }

        try {
            await showBusiness.buyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("User already has a ticket for this show")
        }
    });

    test("Teste de erro ao comprar ingresso de um show que já passou", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: "token-mock-normal",
            showId: "id4"
        }

        try {
            await showBusiness.buyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Show already happened")
        }
    });

    test("Teste de erro ao cancelar ingresso sem parâmetros", async () => {
        expect.assertions(2)

        const input = {} as unknown as IBuyTicketInputDTO

        try {
            await showBusiness.cancelBuyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("token and showId are required")
        }
    });

    test("Teste de erro ao cancelar ingresso com parâmetros diferentes de string", async () => {
        expect.assertions(2)
        const input: IBuyTicketInputDTO = {
            token: 123,
            showId: 123
        } as unknown as IBuyTicketInputDTO

        try {
            await showBusiness.cancelBuyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("token and showId must be strings")
        }

    });

    test("Teste de erro ao cancelar ingresso com token inválido", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: "token-invalido",
            showId: "id4"
        }

        try {
            await showBusiness.cancelBuyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Invalid token")
        }
    });

    test("Teste de erro ao cancelar ingresso de um show que não existe", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: "token-mock-normal",
            showId: "invalid-id"
        }

        try {
            await showBusiness.cancelBuyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Show not found")
        }
    });

    test("Teste de erro ao cancelar ingresso de um show que não comprei", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: "token-mock-normal",
            showId: "id3"
        }

        try {
            await showBusiness.cancelBuyTicket(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("User does not have a ticket for this show")
        }
    });

    test("Teste de erro ao cancelar ingresso de um show que já passou", async () => {
        expect.assertions(2)

        const input: IBuyTicketInputDTO = {
            token: "token-mock-normal",
            showId: "id5"
        }

        try {
            await showBusiness.cancelBuyTicket(input)
        } catch (error) {
            expect(error.message).toBe("You can't cancel a ticket for a show that already happened")
            expect(error.statusCode).toBe(400)
        }
    });

});