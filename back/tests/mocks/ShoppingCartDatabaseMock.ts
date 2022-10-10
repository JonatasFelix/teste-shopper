import { IAddProductCartDTO, IRemoveProductDTO, ISelectCartPrductDTO, IUpdateProductQuantityDTO } from "../../src/models/ShoppingCart"

export class ShoppingCartDatabaseMock {
    public static TABLE_SHOPPING_CART = "shopping_cart"

    public async selectAllProducts(): Promise<any> {


    }

    public async selectProduct(data: ISelectCartPrductDTO): Promise<any> {
        const id = data.id_product

        if(id === 1) {
            return [
                {
                    id_product: 1,
                    quantity: 1
                }
            ]
        }

    }

    public async deleteProduct(data: IRemoveProductDTO): Promise<void> {}

    public async updateProduct(data: IUpdateProductQuantityDTO): Promise<void> {}

    public async insertProduct(data: IAddProductCartDTO): Promise<void> {}

    public deleteAllProducts = async(): Promise<void> => {}

}