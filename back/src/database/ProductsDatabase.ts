import { IInputChangeProductQuantityDTO, IInputProducList, ISelectPrductDTO } from "../models/Products"
import { BaseDatabase } from "./BaseDatabase"

export class ProductsDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "products"

    public selectAllProducts = async (data: IInputProducList): Promise<any> => {
        const products = await BaseDatabase.connection
            .select("*")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .orderBy(data.sort, data.order)
            .limit(data.quantity)
            .offset(data.quantity * (data.page - 1))
            .where("name", "LIKE", `%${data.productName}%`)

        return products
    }

    // RETORNA A QUANTIDADE TOTAL DE PRODUTOS CADASTRADOS
    public selectCountProducts = async (search: string): Promise<any> => {
        const count = await BaseDatabase.connection
            .count("* as count")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .where("name", "LIKE", `%${search}%`)

        return count[0].count
    }

    public selectProductById = async(input: ISelectPrductDTO): Promise<any> => {
        const product = await BaseDatabase.connection
            .select("*")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .where({ id: input.id })
        
        return product
    }

    // ALTERA A QUANTIDADE DE UM PRODUTO CADASTRADO
    public updateProductQuantity = async(input: IInputChangeProductQuantityDTO): Promise<void> => {
        await BaseDatabase.connection
            .update({ qty_stock: input.quantity })
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .where({ id: input.id })
    }

}