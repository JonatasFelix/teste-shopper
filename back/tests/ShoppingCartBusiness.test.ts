import { ShoppingCartBusiness } from "../src/business/ShoppingCartBusiness";
import { ProductsDatabaseMock } from "./mocks/ProductsDatabaseMock";
import { ShoppingCartDatabaseMock } from "./mocks/ShoppingCartDatabaseMock";

describe("Teste ShoppingCartBusiness", () => {

    const shoppingCartBusiness = new ShoppingCartBusiness(
        new ShoppingCartDatabaseMock(),
        new ProductsDatabaseMock()
    )

    test("Teste removeProduct", async () => {
        expect.assertions(1)

        const input = {
            productId: 1
        }

        const result = await shoppingCartBusiness.removeProduct(input)
        expect(result).toBe(true)
    });

});