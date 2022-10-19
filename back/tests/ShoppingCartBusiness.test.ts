import { ShoppingCartBusiness } from "../src/business/ShoppingCartBusiness";
import { IAddProductCart, IRemoveProduct, IUpdateProductQuantity } from "../src/models/ShoppingCart";
import { ProductsDatabaseMock } from "./mocks/ProductsDatabaseMock";
import { AuthenticatorMock } from "./mocks/services/AuthenticatorMock";
import { cartMock, ShoppingCartDatabaseMock } from "./mocks/ShoppingCartDatabaseMock";

describe("Teste ShoppingCartBusiness", () => {

    const shoppingCartBusiness = new ShoppingCartBusiness(
        new ShoppingCartDatabaseMock(),
        new ProductsDatabaseMock(),
        new AuthenticatorMock(),
    );

    //removeProduct 

    test("Teste remover produto do carrinho", async () => {
        const input: IRemoveProduct = {
            token: "valid_token",
            productId: 1
        }

        const result = await shoppingCartBusiness.removeProduct(input);

        expect(result).toEqual(true);
    });

    test("Teste remover produto do carrinho, sem id do produto", async () => {
        expect.assertions(2);

        const input: IRemoveProduct = {
            token: "valid_token",
        } as unknown as IRemoveProduct;

        try {
            await shoppingCartBusiness.removeProduct(input);
        } catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("id é obrigatório");
        }
    });

    test("Teste remover produto do carrinho, sem token", async () => {
        expect.assertions(2);

        const input: IRemoveProduct = {
            token: "",
            productId: 1
        }

        try {
            await shoppingCartBusiness.removeProduct(input);
        } catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("token é obrigatório");
        }
    });

    test("Teste remover produto do carrinho, com token inválido", async () => {
        expect.assertions(2);

        const input: IRemoveProduct = {
            token: "invalid_token",
            productId: 1
        }

        try {
            await shoppingCartBusiness.removeProduct(input);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("token inválido");
        }
    });

    test("Teste remover produto do carrinho, sem endereço", async () => {
        expect.assertions(2);

        const input: IRemoveProduct = {
            token: "noAddress_token",
            productId: 1
        }

        try {
            await shoppingCartBusiness.removeProduct(input);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Usuário não tem endereço cadastrado");
        }
    });

    test("Teste remover produto do carrinho, inexistente", async () => {
        expect.assertions(2);

        const input: IRemoveProduct = {
            token: "valid_token",
            productId: 3
        }

        try {
            await shoppingCartBusiness.removeProduct(input);
        } catch (error) {
            expect(error.statusCode).toBe(404);
            expect(error.message).toBe("Produto não encontrado");
        }
    });

    test("Teste remover produto do carrinho, que não está no carrinho", async () => {
        expect.assertions(2);

        const input: IRemoveProduct = {
            token: "valid_token",
            productId: 2
        }

        try {
            await shoppingCartBusiness.removeProduct(input);
        } catch (error) {
            expect(error.statusCode).toBe(404);
            expect(error.message).toBe("Este produto não está no carrinho");
        }
    });

    //updateProductQuantity 

    test("Teste atualizar quantidade do produto no carrinho", async () => {
        const input: IUpdateProductQuantity = {
            token: "valid_token",
            productId: 1,
            quantity: 2
        }

        const result = await shoppingCartBusiness.updateProductQuantity(input);

        expect(result).toEqual(true);
    });

    test("Teste atualizar quantidade do produto no carrinho, sem id do produto", async () => {
        expect.assertions(2);

        const input: IUpdateProductQuantity = {
            token: "valid_token",
            quantity: 2
        } as unknown as IUpdateProductQuantity;

        try {
            await shoppingCartBusiness.updateProductQuantity(input);
        } catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("id é obrigatório");
        }
    });

    test("Teste atualizar quantidade do produto no carrinho para 0", async () => {
        expect.assertions(2);

        const input: IUpdateProductQuantity = {
            token: "valid_token",
            productId: 1,
            quantity: 0
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input);
        } catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("quantity deve ser maior que 0, ou remova o produto do carrinho");
        }
    });

    test("Teste atualizar quantidade do produto no carrinho, com token inválido", async () => {
        expect.assertions(2);

        const input: IUpdateProductQuantity = {
            token: "invalid_token",
            productId: 1,
            quantity: 2
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("token inválido");
        }
    });

    test("Teste atualizar quantidade do produto no carrinho, sem endereço", async () => {
        expect.assertions(2);

        const input: IUpdateProductQuantity = {
            token: "noAddress_token",
            productId: 1,
            quantity: 2
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input);
        } catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Usuário não tem endereço cadastrado");
        }
    });

    test("Teste updateProductQuantity com produto que não existe", async () => {
        expect.assertions(2)

        const input: IUpdateProductQuantity = {
            productId: 3,
            quantity: 2,
            token: "valid_token"
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
            quantity: 100,
            token: "valid_token"
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

        const input: IUpdateProductQuantity = {
            productId: 2,
            quantity: 2,
            token: "valid_token"
        }

        try {
            await shoppingCartBusiness.updateProductQuantity(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Este produto não está no carrinho")
        }
    });

    //addProduct

    test("Teste adicionar produto no carrinho", async () => {
        expect.assertions(1)

        const input: IAddProductCart = {
            productId: 2,
            token: "valid_token"
        }

        const result = await shoppingCartBusiness.addProduct(input)
        expect(result).toBe(true)
    });


    test("Teste adicionar produto no carrinho, sem id do produto", async () => {
        expect.assertions(2)
        const input: IAddProductCart = {
            token: "valid_token",
            productId: "" as unknown as number
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("id é obrigatório")
        }
    });

    test("Teste adicionar produto no carrinho, que não existe", async () => {
        expect.assertions(2)
        const input: IAddProductCart = {
            token: "valid_token",
            productId: 3
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Produto não encontrado")
        }
    });

    test("Teste adicionar produto no carrinho, com token inválido", async () => {
        expect.assertions(2)
        const input: IAddProductCart = {
            token: "invalid_token",
            productId: 2
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("token inválido")
        }
    });

    test("Teste adicionar produto no carrinho, sem endereço", async () => {
        expect.assertions(2)
        const input: IAddProductCart = {
            token: "noAddress_token",
            productId: 2
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Usuário não tem endereço cadastrado")
        }
    });

    test("Teste adicionar produto no carrinho, sem token", async () => {
        expect.assertions(2)
        const input: IAddProductCart = {
            token: "" as unknown as string,
            productId: 2
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("token é obrigatório")
        }
    });


    test("Teste adicionar produto no carrinho, com produto que não tem estoque suficiente", async () => {
        expect.assertions(2)
        const input: IAddProductCart = {
            token: "valid_token",
            productId: 4
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("Produto indisponível")
        }
    });

    test("Teste adicionar produto no carrinho, com produto que já está no carrinho", async () => {
        expect.assertions(2)
        const input: IAddProductCart = {
            token: "valid_token",
            productId: 1
        }

        try {
            await shoppingCartBusiness.addProduct(input)
        } catch (error) {
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Este produto já está no carrinho")
        }
    });

    //getCart 

    test("Teste getCart", async () => {
        expect.assertions(1)
        const getCart = "valid_token"


        const result = await shoppingCartBusiness.getCart(getCart)
        expect(result).toEqual(cartMock)
    });


    test("Teste getCart, sem token", async () => {
        expect.assertions(2)
        const token = "" as unknown as string

        try {
            await shoppingCartBusiness.getCart(token)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("token é obrigatório")
        }
    });

    test("Teste getCart, com token inválido", async () => {
        expect.assertions(2)
        const token = "invalid_token"

        try {
            await shoppingCartBusiness.getCart(token)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("token inválido")
        }
    });

    test("Teste getCart, sem endereço", async () => {
        expect.assertions(2)
        const token = "noAddress_token"

        try {
            await shoppingCartBusiness.getCart(token)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Usuário não tem endereço cadastrado")
        }
    });

    //clearCart

    test("Teste clearCart", async () => {
        const token = "valid_token"
        const result = await shoppingCartBusiness.clearCart(token)
        expect(result).toBe(true)
    });

    test("Teste clearCart sem token", async () => {
        expect.assertions(2)
        const token = "" as unknown as string

        try {
            await shoppingCartBusiness.clearCart(token)
        } catch (error) {
            expect(error.statusCode).toBe(400)
            expect(error.message).toBe("token é obrigatório")
        }
    });

    test("Teste clearCart com token inválido", async () => {
        expect.assertions(2)
        const token = "invalid_token"

        try {
            await shoppingCartBusiness.clearCart(token)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("token inválido")
        }
    });

    test("Teste clearCart com token de usuário que não tem endereco", async () => {
        expect.assertions(2)
        const token = "noAddress_token"

        try {
            await shoppingCartBusiness.clearCart(token)
        } catch (error) {
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Usuário não tem endereço cadastrado")
        }
    });

});