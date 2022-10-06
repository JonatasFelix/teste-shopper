import { IInputOrderDTO, IOrderInputDTO } from "../models/Orders"
import { BaseDatabase } from "./BaseDatabase"

export class OrdersDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "orders"
    public static TABLE_ORDER_ITEMS = "order_items"

    public insertOrder = async(data: IInputOrderDTO): Promise<void> => {
        await BaseDatabase.connection
            .insert(data)
            .into(OrdersDatabase.TABLE_ORDERS)
    }

    public insertProductOrder = async(data: IOrderInputDTO): Promise<any> => {
        await BaseDatabase.connection
            .insert(data)
            .into(OrdersDatabase.TABLE_ORDER_ITEMS)
    }
 
}