import { IInputOrderDTO, IOrderInputDTO, IUpdateOrderStatus, OrderStatus } from "../models/Orders"
import { BaseDatabase } from "./BaseDatabase"

export class OrdersDatabase extends BaseDatabase {
    public static TABLE_ORDERS = "orders"
    public static TABLE_ORDER_ITEMS = "order_items"
    public static TABLE_PRODUCTS = "products"
    public static TABLE_USERS = "users"

    // CRIA UMA NOVA ORDEM - UMA VENDA
    public insertOrder = async(data: IInputOrderDTO): Promise<void> => {
        await BaseDatabase.connection
            .insert(data)
            .into(OrdersDatabase.TABLE_ORDERS)
    }

    // CRIA UM NOVO ITEM DE ORDEM - UM ITEM DE VENDA (ADICIONA OS PRODUTOS VENDIDOS)
    public insertProductOrder = async(data: IOrderInputDTO): Promise<void> => {
        await BaseDatabase.connection
            .insert(data)
            .into(OrdersDatabase.TABLE_ORDER_ITEMS)
    }

    // BUSCA TODAS AS ORDENS
    public selectAllOrders = async(user_id: string): Promise<any> => {
        const result = await BaseDatabase.connection
            .select(
                "orders.id",
                "users.name as userName",
                "orders.total",
                "orders.status",
                "orders.order_date as orderDate",
                "orders.appointment_date as appointmentDate",
            )
            .from(OrdersDatabase.TABLE_ORDERS)
            .join(OrdersDatabase.TABLE_USERS, "orders.user_id", "=", "users.id")
            .where({ user_id })
        return result
    }

    // ALTERA O STATUS DE UMA ORDEM (COMPLETED, PENDDING)
    public updateOrderStatus = async(data: IUpdateOrderStatus): Promise<void> => {
        await BaseDatabase.connection(OrdersDatabase.TABLE_ORDERS)
            .update({status: data.status})
            .where({id: data.id})
    }

    // BUSCA TODAS AS INFORMAÇÕES DE UMA ORDEM (ID, NOME DO USUÁRIO, TOTAL, STATUS, DATA DA ORDEM, DATA DO AGENDAMENTO)
    public selectOrderById = async(id: string, user_id: string): Promise<any> => {
        const result = await BaseDatabase.connection
            .select(
                "orders.id",
                "users.name as userName",
                "orders.total",
                "orders.status",
                "orders.order_date as orderDate",
                "orders.appointment_date as appointmentDate",
            )
            .from(OrdersDatabase.TABLE_ORDERS)
            .join(OrdersDatabase.TABLE_USERS, "orders.user_id", "=", "users.id")
            .where("orders.id", "=", id)
            .andWhere({user_id})
        return result
    }


    // BUSCA TODOS OS PRODUTOS DE UMA ORDEM (NOME DO PRODUTO, QUANTIDADE, PREÇO)
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