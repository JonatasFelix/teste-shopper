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
    user_id: string,
    product_id: number,
    qty: number,
}

export interface IInputOrder {
    token: string,
    products: IProduct[],
    appointmentDate: string
}


export interface IInputOrderDTO {
    id: string,
    user_id: string,
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


export interface IOrderDto {
    id: string,
    user_name: string,
    total: number,
    status: OrderStatus,
    order_date: Date,
    appointment_date: string,
}


export interface IUpdateOrderStatus {
    id: string,
    status: OrderStatus
}

export interface IInputOrderDetails {
    id: string,
    token: string
}
