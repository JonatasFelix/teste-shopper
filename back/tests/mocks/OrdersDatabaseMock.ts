import { IInputOrderDTO, IOrderInputDTO, OrderStatus } from "../../src/models/Orders"


export class OrdersDatabaseMock {
    public static TABLE_ORDERS = "orders"
    public static TABLE_ORDER_ITEMS = "order_items"

    public insertOrder = async (data: IInputOrderDTO): Promise<void> => { }

    public insertProductOrder = async (data: IOrderInputDTO): Promise<void> => { }

    public updateOrderStatus = async (id: string, status: OrderStatus): Promise<void> => { }



    public selectAllOrders = async (): Promise<any> => {

        return [
            {
                id: "id",
                userName: "Jonatas",
                total: 100,
                status: "pending",
                orderDate: "2021-08-01",
                appointmentDate: new Date("2021-08-01")
            }
        ]
    }



    public selectOrderById = async (id: string): Promise<any> => {
        if (id === "id") {
            return [
                {
                    id: "id",
                    userName: "Jonatas",
                    total: 100,
                    status: "pending",
                    orderDate: "2021-08-01",
                    appointmentDate: new Date("2021-08-01")
                }
            ]
        }

        return []


    }


    public selectOrderDetails = async (id: string): Promise<any> => {
        return [
            {
                productId: "id",
                quantity: 1,
                name: "name",
            }
        ]

    }

}