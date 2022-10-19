import { IInputOrderDTO, IOrderInputDTO, IUpdateOrderStatus, OrderStatus } from "../../src/models/Orders"

export class OrdersDatabaseMock {
    public static TABLE_ORDERS = "orders"
    public static TABLE_ORDER_ITEMS = "order_items"
    public static TABLE_PRODUCTS = "products"
    public static TABLE_USERS = "users"

    // CRIA UMA NOVA ORDEM - UMA VENDA
    public insertOrder = async (data: IInputOrderDTO): Promise<void> => { }

    // CRIA UM NOVO ITEM DE ORDEM - UM ITEM DE VENDA (ADICIONA OS PRODUTOS VENDIDOS)
    public insertProductOrder = async (data: IOrderInputDTO): Promise<void> => { }

    // ALTERA O STATUS DE UMA ORDEM (COMPLETED, PENDDING)
    public updateOrderStatus = async (data: IUpdateOrderStatus): Promise<void> => { }

    // BUSCA TODAS AS ORDENS
    public selectAllOrders = async (user_id: string): Promise<any> => {

        switch (user_id) {
            case "id1":
                return [
                    {
                        id: "id1",
                        userName: "name",
                        total: 100,
                        status: OrderStatus.PENDING,
                        orderDate: "2021-01-01",
                        appointmentDate: "2021-01-01"
                    }
                ]
            default:
                return []
        }
    }



    // BUSCA TODAS AS INFORMAÇÕES DE UMA ORDEM (ID, NOME DO USUÁRIO, TOTAL, STATUS, DATA DA ORDEM, DATA DO AGENDAMENTO)
    public selectOrderById = async (id: string, user_id: string): Promise<any> => {
        switch (id) {
            case "id1":
                return [
                    {
                        id: "id1",
                        userName: "name",
                        total: 100,
                        status: OrderStatus.PENDING,
                        orderDate: "2021-01-01",
                        appointmentDate: "2021-01-01"
                    }
                ]
            default:
                return []
        }
    }


    // BUSCA TODOS OS PRODUTOS DE UMA ORDEM (NOME DO PRODUTO, QUANTIDADE, PREÇO)
    public selectOrderDetails = async (id: string): Promise<any> => {
        switch (id) {
            case "id1":
                return [
                    {
                        productName: "name",
                        quantity: 1,
                        price: 100
                    }
                ]
            default:
                return []
        }
    }

}