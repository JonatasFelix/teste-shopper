import { IInputOrderDTO, IOrderInputDTO } from "../../src/models/Orders"


export class OrdersDatabaseMock {
    public static TABLE_ORDERS = "orders"
    public static TABLE_ORDER_ITEMS = "order_items"

    public insertOrder = async(data: IInputOrderDTO): Promise<void> => {}

    public insertProductOrder = async(data: IOrderInputDTO): Promise<void> => {}
 
}