import { OrdersDatabase } from "../database/OrdersDatabase";
import { ProductsDatabase } from "../database/ProductsDatabase";
import BadRequest from "../errors/BadRequest";
import MissingParameters from "../errors/MissingParameters";
import NotFound from "../errors/NotFound";
import { IInputOrder, IInputOrderDTO, OrderStatus } from "../models/Orders";
import { DateConversion } from "../services/DateConversion";
import { IdGenerator } from "../services/IdGenerator";

export class OrdersBusiness {

    constructor(
        private ordersDatabase: OrdersDatabase,
        private productsDatabase: ProductsDatabase,
        private idGenerator: IdGenerator,
        private dateConversion: DateConversion
    ) { }

    public createOrder = async(input: IInputOrder): Promise<boolean> => {
            const { userName, products, appointmentDate } = input

            if (!userName || !products || !appointmentDate) {
                throw new MissingParameters("userName, products, appointmentDate")
            }

            if (typeof userName !== "string") {
                throw new BadRequest("userName must be a string")
            }

            if (!Array.isArray(products)) {
                throw new BadRequest("products must be an array")
            }

            if (typeof appointmentDate !== "string") {
                throw new BadRequest("appointmentDate must be a string")
            }

            if (!this.dateConversion.checkDateValidity(appointmentDate)) {
                throw new BadRequest("Invalid date")
            }

            const newAppointmentDate = new Date(appointmentDate)

            if(newAppointmentDate <= new Date()) {
                throw new BadRequest("appointmentDate must be a future date")
            }

            let total:number = 0

            const productsListVerify = products.map( async (product: any): Promise<void>=> {
                if (typeof product.quantity !== "number") {
                    throw new BadRequest("quantity must be a number")
                }

                if(product.quantity <= 0) {
                    throw new BadRequest("quantity must be greater than 0")
                }

                const verifyProduct = await this.productsDatabase.selectProductById({id: product.id})

                if(!verifyProduct.length) {
                    throw new NotFound(`Product with id ${product.id} not found`)
                }

                if (verifyProduct[0].qty_stock === 0) {
                    throw new BadRequest(`Product with id ${product.id} and name ${verifyProduct[0].name} is out of stock`)
                }

                if (verifyProduct[0].qty_stock < product.quantity) {
                    throw new BadRequest(`Product with id ${product.id} has only ${verifyProduct[0].qty_stock} in stock`)
                }

                total += verifyProduct[0].price * product.quantity
            })


            await Promise.all(productsListVerify)

            const id: string = this.idGenerator.generate()

            const order : IInputOrderDTO = {
                id: id,
                user_name: userName,
                total: total,
                status: OrderStatus.PENDING,
                order_date: new Date(),
                appointment_date: this.dateConversion.toSqlDate(newAppointmentDate)
            }
            
            await this.ordersDatabase.insertOrder(order)

            const productsList = products.map( async (product: any): Promise<void> => {
                const result = await this.productsDatabase.selectProductById({id: product.id})
                await this.productsDatabase.updateProductQuantity({id: result[0].id, quantity: result[0].qty_stock - product.quantity})
                await this.ordersDatabase.insertProductOrder({order_id: id, product_id: result[0].id, qty: product.quantity})
            })

            await Promise.all(productsList)


            return true
    }
}