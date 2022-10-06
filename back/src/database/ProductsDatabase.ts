import { IInputProducList, ISearchProducByName, ISelectPrductDTO } from "../models/Products"
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

        return products
    }

    public selectCountProducts = async (): Promise<any> => {
        const count = await BaseDatabase.connection
            .count("* as count")
            .from(ProductsDatabase.TABLE_PRODUCTS)

        return count[0].count
    }

    public selectCountProductsByName = async(name: string): Promise<any> => {
        const count = await BaseDatabase.connection
            .count("* as count")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .where("name", "LIKE", `%${name}%`)

        return count[0].count
    }

    public selectProductsByName = async(data: ISearchProducByName): Promise<any> =>{
        const products = await BaseDatabase.connection
            .select("*")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .where("name", "LIKE", `%${data.producName}%`)
            .orderBy(data.sort, data.order)
            .limit(data.quantity)
            .offset(data.quantity * (data.page - 1))
        
        return products
    }

    public selectProductById = async(input: ISelectPrductDTO): Promise<any> => {
        const product = await BaseDatabase.connection
            .select("*")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .where({ id: input.id })
        
        return product
    }
}