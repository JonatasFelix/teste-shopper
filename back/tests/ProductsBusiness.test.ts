import { ProductsBusiness } from "../src/business/ProductsBusiness";
import { IInputProducList } from "../src/models/Products";
import { ProductsDatabaseMock } from "./mocks/ProductsDatabaseMock";

describe("Teste getProducts", () => {

    const productsBusiness = new ProductsBusiness(
        new ProductsDatabaseMock
    )

    test("Teste lista de produtos vazia", async () => {
        expect.assertions(1)

        const result = await productsBusiness.getProducts({ page: 1, productName: "", quantity: 10 })
        expect(result).toEqual([])
    })

    test("Teste lista de produtos", async () => {
        expect.assertions(1)

        const result = await productsBusiness.getProducts({ page: 1, productName: "search", quantity: 10 })
        expect(result).toEqual({
            list: [{ productId: "123", name: "teste", price: 10, quantityStock: 10 }],
            page: "1 of 1",
            quantity: 10,
            total: 1,
            ordened: "asc name"
        })
    })


    test("Teste lista de produtos com pagina maior que a quantidade de paginas", async () => {
        expect.assertions(1)

        const result = await productsBusiness.getProducts({ page: 2, productName: "search", quantity: 10 })
        expect(result).toEqual({
            list: [{ productId: "123", name: "teste", price: 10, quantityStock: 10 }],
            page: "1 of 1",
            quantity: 10,
            total: 1,
            ordened: "asc name"
        })
    })

    test("Teste lista de produtos com pagina e quantidade sendo string", async () => {
        expect.assertions(1)

        const result = await productsBusiness.getProducts({ 
            page: "sa", 
            productName: 
            "search", quantity: "as" } as unknown as IInputProducList
            )
        expect(result).toEqual({
            list: [{ productId: "123", name: "teste", price: 10, quantityStock: 10 }],
            page: "1 of 1",
            quantity: 10,
            total: 1,
            ordened: "asc name"
        })
    })

    test("Teste de pegar produto por id", async () => {
        expect.assertions(1)

        const result = await productsBusiness.getProductById(1)
        expect(result).toEqual({
            productId: 1,
            name: "Produto 1",
            price: 10,
            quantityStock: 10
        })
    })

    test("Teste de pegar produto por id que não existe", async () => {
        expect.assertions(2)

        try {
            await productsBusiness.getProductById(3)
        }
        catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Produto não encontrado")
        }
    })

    test("Teste de pegar produto por id invalido", async () => {
        expect.assertions(2)

        try {
            await productsBusiness.getProductById("a" as unknown as number)
        }   catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("id inválido")
        }

    })

});