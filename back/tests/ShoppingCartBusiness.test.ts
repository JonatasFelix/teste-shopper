import { ShoppingCartBusiness } from "../src/business/ShoppingCartBusiness";
import { IAddProductCart, IRemoveProduct, IUpdateProductQuantity } from "../src/models/ShoppingCart";
import { ProductsDatabaseMock } from "./mocks/ProductsDatabaseMock";
import { cartMock, ShoppingCartDatabaseMock } from "./mocks/ShoppingCartDatabaseMock";

describe("Teste ShoppingCartBusiness", () => {

    const shoppingCartBusiness = new ShoppingCartBusiness(
        new ShoppingCartDatabaseMock(),
        new ProductsDatabaseMock()
    )

    test("Teste removeProduct", async () => {
        expect.assertions(1)

        const input: IRemoveProduct = {
            productId: 1
        }

        const result = await shoppingCartBusiness.removeProduct(input)
        expect(result).toBe(true)
    });

    test("Teste removeProduct com id invalido", async () => {
        expect.assertions(2)

        const input: IRemoveProduct = {
            productId: "" as unknown as number
        }

        try {
            await shoppingCartBusiness.removeProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("id é obrigatório")
        }
    });

    test("Teste removeProduct com id que não existe", async () => {
        expect.assertions(2)

        const input: IRemoveProduct = {
            productId: 3
        }

        try {
            await shoppingCartBusiness.removeProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Produto não encontrado")
        }
    });

    test("Teste removeProduct que não está no carrinho", async () => {
        expect.assertions(2)

        const input: IRemoveProduct = {
            productId: 2
        }

        try {
            await shoppingCartBusiness.removeProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Este produto não está no carrinho")
        }
    });

    test("Teste updateProductQuantity", async () => {
        expect.assertions(1)

        const input: IUpdateProductQuantity = {
            productId: 1,
            quantity: 2
        }

        const result = await shoppingCartBusiness.updateProductQuantity(input)
        expect(result).toBe(true)
    });

    test("Teste updateProductQuantity com id invalido", async () => {
        expect.assertions(2)

        const input = {
            productId: "" as unknown as number,
            quantity: 2
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("id é obrigatório")
        }
    });

    test("Teste updateProductQuantity com quantidade invalida", async () => {
        expect.assertions(2)

        const input: IUpdateProductQuantity = {
            productId: 1,
            quantity: "" as unknown as number
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("quantity é obrigatório")
        }
    });

    test("Teste updateProductQuantity com a quantidade menor que 1", async () => {
        expect.assertions(2)

        const input: IUpdateProductQuantity = {
            productId: 1,
            quantity: 0
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("quantity deve ser maior que 0, ou remova o produto do carrinho")
        }
    });

    test("Teste updateProductQuantity com produto que não existe", async () => {
        expect.assertions(2)

        const input: IUpdateProductQuantity = {
            productId: 3,
            quantity: 2
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Produto não encontrado")
        }
    });

    test("Teste updateProductQuantity com produto que não tem estoque suficiente", async () => {
        expect.assertions(2)

        const input: IUpdateProductQuantity = {
            productId: 1,
            quantity: 100
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Quantidade em estoque insuficiente, temos apenas 10 unidades")
        }
    });


    test("Teste updateProductQuantity com produto que não está no carrinho", async () => {
        expect.assertions(2)

        const input: IUpdateProductQuantity  = {
            productId: 2,
            quantity: 2
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Este produto não está no carrinho")
        }
    });


    test("Teste addProduct", async () => {
        expect.assertions(1)

        const input: IAddProductCart = {
            productId: 2
        }

        const result = await shoppingCartBusiness.addProduct(input)
        expect(result).toBe(true)
    });

    test("Teste addProduct com id invalido", async () => {
        expect.assertions(2)

        const input: IAddProductCart = {
            productId: "" as unknown as number
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("id é obrigatório")
        }
    });

    test("Teste addProduct com productId que não existe", async () => {
        expect.assertions(2)

        const input: IAddProductCart = {
            productId: 3
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Produto não encontrado")
        }
    });

    test("Teste addProduct com que já está no carrinho", async () => {
        expect.assertions(2)

        const input: IAddProductCart = {
            productId: 1
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Este produto já está no carrinho")
        }
    });

    test("Teste addProduct com que não tem estoque", async () => {
        expect.assertions(2)

        const input: IAddProductCart = {
            productId: 4
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Produto indisponível")
        }
    });

    test("Teste getCart", async () => {
        expect.assertions(1)

        const result = await shoppingCartBusiness.getCart()
        expect(result).toEqual(cartMock)
    });

    test("Teste clearCart", async () => {
        expect.assertions(1)

        const result = await shoppingCartBusiness.clearCart()
        expect(result).toBe(true)
    })


});