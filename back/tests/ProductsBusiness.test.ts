import { ProductsBusiness } from "../src/business/ProductsBusiness";
import { IInputProducList } from "../src/models/Products";
import { ProductsDatabaseMock } from "./mocks/ProductsDatabaseMock";
import { AuthenticatorMock } from "./mocks/services/AuthenticatorMock";
import { UsersDataBaseMock } from "./mocks/UserDatabaseMock";

describe("Test ProductsBusiness", () => {
    const productsBusiness = new ProductsBusiness(
        new ProductsDatabaseMock(),
        new AuthenticatorMock(),
        new UsersDataBaseMock()
    );

    // getProducts 
    test("Teste pegar todos os produtos", async () => {
        const input: IInputProducList ={
            productName: "search",
            token: "valid_token",
            page: 10
        } as unknown as IInputProducList;

        const result = await productsBusiness.getProducts(input);

        expect(result).toEqual(
            {
                list: [
                    { 
                        name: "teste", 
                        price: 10, 
                        productId: "123", 
                        quantityStock: 10
                    }
                ], 
                ordened: "asc name", 
                page: "1 of 1", 
                quantity: 10, "total": 1
            }
        );
    });

    test("Teste pegar todos os produtos, com lista vazia", async () => {
        const input: IInputProducList ={
            token: "valid_token",
        } as unknown as IInputProducList;

        const result = await productsBusiness.getProducts(input);

        expect(result).toEqual([]);
    });

    test("Teste pegar todos os produtos, sem token", async () => {
        expect.assertions(2);

        const input: IInputProducList ={
            productName: "search",
            page: 10
        } as unknown as IInputProducList;

        try {
            await productsBusiness.getProducts(input);
        } catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("Token inválido");
        }
    });

    test("Teste pegar todos os produtos, com token inválido", async () => {
        expect.assertions(2);

        const input: IInputProducList ={
            productName: "search",
            token: "invalid_token",
            page: 10,
            quantity: 0
        } as unknown as IInputProducList;

        try {
            await productsBusiness.getProducts(input);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Token inválido");
        }
    });

    test("Teste pegar todos os produtos, com token valido, mas não cadastrado", async () => {
        expect.assertions(2);

        const input: IInputProducList ={
            productName: "search",
            token: "valid-token-noUser",
            page: 10
        } as unknown as IInputProducList;

        try {
            await productsBusiness.getProducts(input);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Usuário não encontrado");
        }
    });

    test("Teste pegar todos os produtos, sem endereco", async () => {
        expect.assertions(2);

        const input: IInputProducList ={
            productName: "search",
            token: "noAddress_token",
            page: 10
        } as unknown as IInputProducList;

        try {
            await productsBusiness.getProducts(input);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Usuário não possui endereço cadastrado");
        }
    });

    // getProductById

    test("Teste pegar produto por id", async () => {
        const id = 1;
        const token = "valid_token";

        const result = await productsBusiness.getProductById(id, token);

        expect(result).toEqual({
            productId: 1,
            name: "Produto 1",
            price: 10,
            quantityStock: 10
        });
    });

    test("Teste pegar produto com id inválido", async () => {
        expect.assertions(2);

        const id = "a" as unknown as number;
        const token = "valid_token";

        try {
            await productsBusiness.getProductById(id, token);
        } catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("id inválido");
        }
    });

    test("Teste pegar produto com id não encontrado", async () => {
        expect.assertions(2);

        const id = 3;
        const token = "valid_token";

        try {
            await productsBusiness.getProductById(id, token);
        } catch (error) {
            expect(error.statusCode).toBe(404);
            expect(error.message).toBe("Produto não encontrado");
        }
    });

    test("Teste pegar produto sem token", async () => {
        expect.assertions(2);

        const id = 1;

        try {
            await productsBusiness.getProductById(id, "");
        } catch (error) {
            expect(error.statusCode).toBe(422);
            expect(error.message).toBe("Token é obrigatório");
        }
    });

    test("Teste pegar produto com token inválido", async () => {
        expect.assertions(2);

        const id = 1;
        const token = "invalid_token";

        try {
            await productsBusiness.getProductById(id, token);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Token inválido");
        }
    });

    test("Teste pegar produto com token válido, mas não cadastrado", async () => {
        expect.assertions(2);

        const id = 1;
        const token = "valid-token-noUser";

        try {
            await productsBusiness.getProductById(id, token);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Usuário não encontrado");
        }
    });

    test("Teste pegar produto com token válido, mas sem endereço", async () => {
        expect.assertions(2);

        const id = 1;
        const token = "noAddress_token";

        try {
            await productsBusiness.getProductById(id, token);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Usuário não possui endereço cadastrado");
        }
    });
});