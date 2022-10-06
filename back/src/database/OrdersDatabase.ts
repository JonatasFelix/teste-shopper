import { Order } from "../models/Orders"
import { BaseDatabase } from "./BaseDatabase"

export class OrdersDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "orders"
    public static TABLE_ORDER_ITEMS = "order_items"

    public async createOrder(order: Order): Promise<void> {
        await BaseDatabase.connection
            .insert({
                id: order.getId(),
                user_name: order.getUserName(),
                total: order.getTotal(),
                status: order.getStatus(),
                order_date: order.getOrderDate(),
                appointment_date: order.getAppointmentDate()
            })
            .into(OrdersDatabase.TABLE_ORDERS)
    }

    // public async createOrderItem(orderItem: OrderItem): Promise<void> {
    //     await BaseDatabase.connection
    //         .insert(orderItem)
    //         .into(OrdersDatabase.TABLE_ORDER_ITEMS)
    // }
 
}