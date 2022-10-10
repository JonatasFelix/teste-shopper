export enum OrderStatus {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export interface IProduct {
    id: number,
    quantity: number
}

export interface IOrderInputDTO {
    order_id: string,
    product_id: number,
    qty: number,
}

export interface IInputOrder {
    userName: string,
    products: IProduct[],
    appointmentDate: string
}


export interface IInputOrderDTO {
    id: string,
    user_name: string,
    total: number,
    status: OrderStatus,
    order_date: Date,
    appointment_date: string
}

export interface IProductOrder {
    productId: number,
    quantity: number,
    name: string,
}

export interface IOrderDetails {
    id: string,
    userName: string,
    total: number,
    status: OrderStatus,
    orderDate: Date,
    appointmentDate: string,
    products: IProductOrder[]
}

export interface IOrder {
    id: string,
    userName: string,
    total: number,
    status: OrderStatus,
    orderDate: Date,
    appointmentDate: string,
}

export class Order {
    constructor(
        private id: string,
        private user_name: string,
        private total: number,
        private status: OrderStatus,
        private order_date: Date,
        private appointment_date: Date
    ) { }

    public getId = () => this.id
    public getUserName = () => this.user_name
    public getTotal = () => this.total
    public getStatus = () => this.status
    public getOrderDate = () => this.order_date
    public getAppointmentDate = () => this.appointment_date

    public setId = (newId: string) => { this.id = newId }
    public setUserName = (newUserName: string) => { this.user_name = newUserName }
    public setTotal = (newTotal: number) => { this.total = newTotal }
    public setStatus = (newStatus: OrderStatus) => { this.status = newStatus }
    public setOrderDate = (newOrderDate: Date) => { this.order_date = newOrderDate }
    public setAppointmentDate = (newAppointmentDate: Date) => { this.appointment_date = newAppointmentDate }

    public static toOrderModel = (order: any): Order => {
        return new Order(order.id, order.user_name, order.total, order.status, order.order_date, order.appointment_date)
    }
}