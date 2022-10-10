import { IAddProductCartDTO, IRemoveProductDTO, ISelectCartPrductDTO, IUpdateProductQuantityDTO } from "../models/ShoppingCart"
import { BaseDatabase } from "./BaseDatabase"

export class ShoppingCartDatabase extends BaseDatabase {
    public static TABLE_SHOPPING_CART = "shopping_cart"

    public async selectAllProducts(): Promise<any> {
        const products = await BaseDatabase.connection
            .select(
                "products.id",
                "products.name",
                "products.price",
                "products.qty_stock",
                "shopping_cart.quantity"
            )
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .join("products", "products.id", "=", "shopping_cart.id_product")
        
        return products
    }

    public async selectProduct(data: ISelectCartPrductDTO): Promise<any> {
        const product = await BaseDatabase.connection
            .select("*")
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .where(data)

        return product
    }

    public async deleteProduct(data: IRemoveProductDTO): Promise<void> {
        await BaseDatabase.connection
            .delete()
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .where(data)
    }

    public async updateProduct(data: IUpdateProductQuantityDTO): Promise<void> {
        await BaseDatabase.connection
            .update({ quantity: data.quantity })
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
            .where({ id_product: data.id_product })
    }

    public async insertProduct(data: IAddProductCartDTO): Promise<void> {
        await BaseDatabase.connection
            .insert(data)
            .into(ShoppingCartDatabase.TABLE_SHOPPING_CART)
    }

    public deleteAllProducts = async(): Promise<void> => {
        await BaseDatabase.connection
            .delete()
            .from(ShoppingCartDatabase.TABLE_SHOPPING_CART)
    }

}