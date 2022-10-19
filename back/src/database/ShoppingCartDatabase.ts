import { IAddProductCartDTO, IRemoveProductDTO, ISelectCartPrductDTO, IUpdateProductQuantityDTO } from "../models/ShoppingCart"
import { BaseDatabase } from "./BaseDatabase"

export class ShoppingCartDatabase extends BaseDatabase {
    public static TABLE_SHOPPING_CART = "shopping_cart"

    public async selectAllProducts(user_id: string): Promise<any> {
        const products = await BaseDatabase.connection
            .select(
                "products.id",
                "products.name",
                "products.price",
                "products.qty_stock",
                "shopping_cart.quantity"
            )
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .join("products", "products.id", "=", "shopping_cart.product_id")
            .where({ user_id })
        
        return products
    }

    public async selectProduct(data: ISelectCartPrductDTO): Promise<any> {
        const product = await BaseDatabase.connection
            .select("*")
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .where({ product_id: data.product_id })
            .andWhere({ user_id: data.user_id })

        return product
    }

    public async deleteProduct(data: IRemoveProductDTO): Promise<void> {
        await BaseDatabase.connection
            .delete()
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .where({ product_id: data.product_id })
            .andWhere({ user_id: data.user_id })
    }

    public async updateProduct(data: IUpdateProductQuantityDTO): Promise<void> {
        await BaseDatabase.connection
            .update({ quantity: data.quantity })
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .where({ product_id: data.product_id })
            .andWhere({ user_id: data.user_id })
    }

    public async insertProduct(data: IAddProductCartDTO): Promise<void> {
        await BaseDatabase.connection
            .insert(data)
            .into(ShoppingCartDatabase.TABLE_SHOPPING_CART)
    }

    public deleteAllProducts = async(id: string): Promise<void> => {
        await BaseDatabase.connection
            .delete()
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .where({ user_id: id })
    }

}