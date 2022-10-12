import { IInputOrderDTO, IOrderInputDTO, OrderStatus } from "../models/Orders"
import { BaseDatabase } from "./BaseDatabase"

export class OrdersDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "orders"
    public static TABLE_ORDER_ITEMS = "order_items"
    public static TABLE_PRODUCTS = "products"

    // CRIAR O PEDIDO
    public insertOrder = async(data: IInputOrderDTO): Promise<void> => {
        await BaseDatabase.connection
            .insert(data)
            .into(OrdersDatabase.TABLE_ORDERS)
    }

    // INSERE OS PRODUTOS DO PEDIDO NA TABELA order_items
    public insertProductOrder = async(data: IOrderInputDTO): Promise<void> => {
        await BaseDatabase.connection
            .insert(data)
            .into(OrdersDatabase.TABLE_ORDER_ITEMS)
    }

    // MOSTRA TODOS OS PEDIDOS
    public selectAllOrders = async(): Promise<any> => {
        const result = await BaseDatabase.connection
            .select(
                "orders.id",
                "orders.user_name as userName",
                "orders.total",
                "orders.status",
                "orders.order_date as orderDate",
                "orders.appointment_date as appointmentDate",
            )
            .from(OrdersDatabase.TABLE_ORDERS)
        return result
    }

    // ALTERA O STATUS DO PEDIDO "PENDING" PARA "COMPLETED"
    public updateOrderStatus = async(id: string, status: OrderStatus): Promise<void> => {
        await BaseDatabase.connection(OrdersDatabase.TABLE_ORDERS)
            .update({status: status})
            .where({id: id})
    }


    // PEGAR UM PEDIDO ESPECÍFICO
    public selectOrderById = async(id: string): Promise<any> => {
        const result = await BaseDatabase.connection
            .select(
                "orders.id",
                "orders.user_name as userName",
                "orders.total",
                "orders.status",
                "orders.order_date as orderDate",
                "orders.appointment_date as appointmentDate",
            )
            .from(OrdersDatabase.TABLE_ORDERS)
            .where({id: id})
        return result
    }

    // PEGA OS PRODUTOS DE UMA VENDA
    public selectOrderDetails = async(id: string): Promise<any> => {
        const result = await BaseDatabase.connection
            .select(
                "order_items.product_id as productId",
                "qty as quantity",
                "name",
            )
            .from(OrdersDatabase.TABLE_ORDER_ITEMS)
            .join(OrdersDatabase.TABLE_PRODUCTS, "products.id", "=", "order_items.product_id")
            .where({order_id: id})

        return result
    }
 
}