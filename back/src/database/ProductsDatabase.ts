import { IInputProducList, ISelectPrductDTO } from "../models/Products"
import { BaseDatabase } from "./BaseDatabase"

export class ProductsDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "products"

    public async selectAllProducts(data: IInputProducList): Promise<any> {
        const products = await BaseDatabase.connection
            .select("*")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .limit(data.quantity)
            .offset(data.quantity * (data.page - 1))
        
        return products
    }

    public async selectCountProducts(): Promise<any> {
        const count = await BaseDatabase.connection
            .count("* as count")
            .from(ProductsDatabase.TABLE_PRODUCTS)

        return count[0].count
    }

    public async selectWhereProducts(name: string): Promise<any> {
        const products = await BaseDatabase.connection
            .select("*")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .where("name", "LIKE", `%${name}%`)
        
        return products
    }

    public async selectProductById(input: ISelectPrductDTO): Promise<any> {
        const product = await BaseDatabase.connection
            .select("*")
            .from(ProductsDatabase.TABLE_PRODUCTS)
            .where({ id: input.id })
        
        return product
    }
}