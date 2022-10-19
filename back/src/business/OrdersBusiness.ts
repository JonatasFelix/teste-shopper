import { OrdersDatabase } from "../database/OrdersDatabase";
import { ProductsDatabase } from "../database/ProductsDatabase";
import { UsersDataBase } from "../database/UsersDataBase";
import BadRequest from "../errors/BadRequest";
import MissingParameters from "../errors/MissingParameters";
import NotFound from "../errors/NotFound";
import Unauthorized from "../errors/Unauthorized";
import { IInputOrder, IInputOrderDetails, IInputOrderDTO, IOrder, IOrderDetails, IProductOrder, IUpdateOrderStatus, OrderStatus } from "../models/Orders";
import { UserHasAddress } from "../models/Users";
import { Authenticator } from "../services/AuthenticatorData";
import { DateConversion } from "../services/DateConversion";
import { IdGenerator } from "../services/IdGenerator";

export class OrdersBusiness {

    constructor(
        private ordersDatabase: OrdersDatabase,
        private productsDatabase: ProductsDatabase,
        private idGenerator: IdGenerator,
        private dateConversion: DateConversion,
        private authenticator: Authenticator,
        private usersDataBase: UsersDataBase,
    ) { }

    public createOrder = async (input: IInputOrder): Promise<boolean> => {
        const { token, products, appointmentDate } = input

        if (!Array.isArray(products)) {
            throw new BadRequest("products deve ser um array")
        }

        if (typeof appointmentDate !== "string") {
            throw new BadRequest("appointmentDate deve ser uma string")
        }

        if (!this.dateConversion.checkDateValidity(appointmentDate)) {
            throw new BadRequest("appointmentDate deve ser uma data válida")
        }


        if (!token) {
            throw new MissingParameters("token é obrigatório")
        }

        const tokenData = this.authenticator.getTokenPayload(token)

        if (!tokenData) {
            throw new Unauthorized('Token inválido')
        }

        const user: any = await this.usersDataBase.selectUserById(tokenData.id)

        if (!user.length) {
            throw new Unauthorized("Usuário não encontrado")
        }

        if (user[0].has_address === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não possui endereço cadastrado")
        }

        const newAppointmentDate = new Date(appointmentDate)

        if (newAppointmentDate <= new Date()) {
            throw new BadRequest("appointmentDate deve ser uma data futura")
        }

        let total: number = 0

        const productsListVerify = products.map(async (product: any): Promise<void> => {
            if (typeof product.quantity !== "number") {
                throw new BadRequest("quantity deve ser um número")
            }

            if (product.quantity <= 0) {
                throw new BadRequest("quantity deve ser maior que 0")
            }

            const verifyProduct = await this.productsDatabase.selectProductById({ id: product.id })

            if (!verifyProduct.length) {
                throw new NotFound(`Produto com id ${product.id} não encontrado`)
            }

            if (verifyProduct[0].qty_stock === 0) {
                throw new BadRequest(`${verifyProduct[0].name} está esgotado`)
            }

            if (verifyProduct[0].qty_stock < product.quantity) {
                throw new BadRequest(`${verifyProduct[0].name} possui apenas ${verifyProduct[0].qty_stock} unidades em estoque`)
            }

            total += verifyProduct[0].price * product.quantity
        })


        await Promise.all(productsListVerify)

        const id: string = this.idGenerator.generate()

        const order: IInputOrderDTO = {
            id: id,
            user_id: user[0].id,
            total: total,
            status: OrderStatus.PENDING,
            order_date: new Date(),
            appointment_date: this.dateConversion.toSqlDate(newAppointmentDate)
        }

        await this.ordersDatabase.insertOrder(order)

        const productsList = products.map(async (product: any): Promise<void> => {
            const result = await this.productsDatabase.selectProductById({ id: product.id })
            await this.productsDatabase.updateProductQuantity({ id: result[0].id, quantity: result[0].qty_stock - product.quantity })
            await this.ordersDatabase.insertProductOrder({
                order_id: id,
                product_id: result[0].id,
                qty: product.quantity,
                user_id: user[0].id
            })
        })

        await Promise.all(productsList)


        return true
    }

    public getAllOrders = async (token: string): Promise<IOrder | []> => {

        if (!token) {
            throw new MissingParameters("token é obrigatório")
        }

        const tokenData = this.authenticator.getTokenPayload(token)

        if (!tokenData) {
            throw new Unauthorized('Token inválido')
        }

        const user: any = await this.usersDataBase.selectUserById(tokenData.id)

        if (!user.length) {
            throw new Unauthorized("Usuário não encontrado")
        }

        if (user[0].has_address === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não possui endereço cadastrado")
        }


        const result = await this.ordersDatabase.selectAllOrders(tokenData.id)

        if (!result.length) {
            return []
        }

        const ordersPending: IProductOrder[] = result.filter(async (order: any, index: number): Promise<void> => {
            if (order.status === "pending" && order.appointmentDate <= new Date()) {
                result[index].status = OrderStatus.COMPLETED
                const data: IUpdateOrderStatus = { id: order.id, status: OrderStatus.COMPLETED }
                await this.ordersDatabase.updateOrderStatus(data)
            }
        })

        await Promise.all(ordersPending)

        return result
    }

    public getOrderDetailsById = async (input: IInputOrderDetails): Promise<IOrderDetails> => {

        const { token, id } = input

        if (!id) {
            throw new MissingParameters("id é obrigatório")
        }

        if (typeof id !== "string") {
            throw new BadRequest("id deve ser uma string")
        }

        if (!token) {
            throw new MissingParameters("token é obrigatório")
        }

        const tokenData = this.authenticator.getTokenPayload(token)

        if (!tokenData) {
            throw new Unauthorized('Token inválido')
        }

        const user: any = await this.usersDataBase.selectUserById(tokenData.id)

        if (!user.length) {
            throw new Unauthorized("Usuário não encontrado")
        }

        if (user[0].has_address === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não possui endereço cadastrado")
        }

        const result = await this.ordersDatabase.selectOrderById(id, tokenData.id)

        if (!result.length) {
            throw new NotFound("Pedido não encontrado")
        }

        const products: IProductOrder[] = await this.ordersDatabase.selectOrderDetails(id)

        if (result[0].status === "pending" && result[0].appointmentDate <= new Date()) {
            const data: IUpdateOrderStatus = { id: result[0].id, status: OrderStatus.COMPLETED }
            await this.ordersDatabase.updateOrderStatus(data)
            result[0].status = OrderStatus.COMPLETED
        }

        const orderDetails: IOrderDetails = {
            id: result[0].id,
            userName: result[0].userName,
            total: result[0].total,
            status: result[0].status,
            orderDate: result[0].orderDate,
            appointmentDate: result[0].appointmentDate,
            products: products
        }

        return orderDetails
    }
}

