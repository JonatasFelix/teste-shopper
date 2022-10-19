import { IInputChangeProductQuantityDTO, IInputProducList, ISelectPrductDTO } from "../../src/models/Products"


export class ProductsDatabaseMock {
    public static TABLE_PRODUCTS = "products"

    public selectAllProducts = async (data: IInputProducList): Promise<any> => {

        return [
            {
                id: "123",
                name: "teste",
                price: 10,
                qty_stock: 10
            }
        ]
    }

    public selectCountProducts = async (search: string): Promise<any> => {
        switch (search) {
            case "search": return 1
            default: return 0
        }
    }

    public selectProductById = async (input: ISelectPrductDTO): Promise<any> => {
        const { id } = input

        if (id === 1) {
            return [{
                id: 1,
                name: "Produto 1",
                price: 10,
                qty_stock: 10
            }]
        }

        if (id === 2) {
            return [{
                id: 2,
                name: "Produto 2",
                price: 20,
                qty_stock: 20
            }]
        }

        if (id === 3) {
            return []
        }

        if (id === 4) {
            return [{
                id: 4,
                name: "Produto 4",
                price: 40,
                qty_stock: 0
            }]
        }
    }


    public updateProductQuantity = async (input: IInputChangeProductQuantityDTO): Promise<void> => { }
}