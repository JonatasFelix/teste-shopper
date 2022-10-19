import { IAddProductCartDTO, IRemoveProductDTO, ISelectCartPrductDTO, IShoppingCartList, IUpdateProductQuantityDTO } from "../../src/models/ShoppingCart"

const cartProductsMock =  [
    {
        id: 1,
        name: "Produto 1",
        price: 10,
        qty_stock: 10,
        quantity: 1
    },
    {
        id: 2,
        name: "Produto 2",
        price: 20,
        qty_stock: 20,
        quantity: 2
    },
    {
        id: 3,
        name: "Produto 3",
        price: 30,
        qty_stock: 0,
        quantity: 3
    }
]


export const cartMock: IShoppingCartList = {
    list: [
        {
            productId: 1,
            name: "Produto 1",
            price: 10,
            quantityStock: 10,
            quantity: 1
        },
        {
            productId: 2,
            name: "Produto 2",
            price: 20,
            quantityStock: 20,
            quantity: 2
        }
    ],
    outStock: [
        {
            productId: 3,
            name: "Produto 3",
            price: 30,
            quantityStock: 0,
            quantity: 3
        }
    ],
    totalValue: 50,
    totalQuantity: 3
}



export class ShoppingCartDatabaseMock {
    public static TABLE_SHOPPING_CART = "shopping_cart"

    public async selectAllProducts(): Promise<any> {
        return cartProductsMock

    }

    public async selectProduct(data: ISelectCartPrductDTO): Promise<any> {
        const id = data.product_id

        if (id === 1) {
            return [
                {
                    product_id: 1,
                    quantity: 1
                }
            ]
        }

        if (id === 2) {
            return []
        }

        if (id === 4) {
            return []
        }
    }

    public async deleteProduct(data: IRemoveProductDTO): Promise<void> { }

    public async updateProduct(data: IUpdateProductQuantityDTO): Promise<void> { }

    public async insertProduct(data: IAddProductCartDTO): Promise<void> { }

    public deleteAllProducts = async (): Promise<void> => { }

}