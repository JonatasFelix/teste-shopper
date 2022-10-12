import { OrdersDatabase } from "../database/OrdersDatabase";
import { ProductsDatabase } from "../database/ProductsDatabase";
import BadRequest from "../errors/BadRequest";
import MissingParameters from "../errors/MissingParameters";
import NotFound from "../errors/NotFound";
import { IInputOrder, IInputOrderDTO, IOrder, IOrderDetails, IProductOrder, OrderStatus } from "../models/Orders";
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
                throw new MissingParameters("userName, products, appointmentDate são obrigatórios")
            }

            if (typeof userName !== "string") {
                throw new BadRequest("userName deve ser uma string")
            }

            if (!Array.isArray(products)) {
                throw new BadRequest("products deve ser um array")
            }

            if (typeof appointmentDate !== "string") {
                throw new BadRequest("appointmentDate deve ser uma string")
            }

            if (!this.dateConversion.checkDateValidity(appointmentDate)) {
                throw new BadRequest("appointmentDate deve ser uma data válida")
            }

            const newAppointmentDate = new Date(appointmentDate)

            if(newAppointmentDate <= new Date()) {
                throw new BadRequest("appointmentDate deve ser uma data futura")
            }

            let total:number = 0

            // VERIFICANDO SE OS OS DAOOS DOS PRODUTOS ESTÃO CORRETOS - SE O PRODUTO EXISTE E SE POSSUI ESTOQUE
            const productsListVerify = products.map( async (product: any): Promise<void>=> {
                if (typeof product.quantity !== "number") {
                    throw new BadRequest("quantity deve ser um número")
                }

                if(product.quantity <= 0) {
                    throw new BadRequest("quantity deve ser maior que 0")
                }

                const verifyProduct = await this.productsDatabase.selectProductById({id: product.id})

                if(!verifyProduct.length) {
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

            const order : IInputOrderDTO = {
                id: id,
                user_name: userName,
                total: total,
                status: OrderStatus.PENDING,
                order_date: new Date(),
                appointment_date: this.dateConversion.toSqlDate(newAppointmentDate)
            }
            
            await this.ordersDatabase.insertOrder(order)

            // MAP PARA ADICIONAR O PRODUTO NA TABELA DE VENDAS
            // E REMOVER A QUANTIDADE DE PRODUTOS DO ESTOQUE
            const productsList = products.map( async (product: any): Promise<void> => {
                const result = await this.productsDatabase.selectProductById({id: product.id})
                await this.productsDatabase.updateProductQuantity({id: result[0].id, quantity: result[0].qty_stock - product.quantity})
                await this.ordersDatabase.insertProductOrder({order_id: id, product_id: result[0].id, qty: product.quantity})
            })

            await Promise.all(productsList)


            return true
    }

    public getAllOrders = async(): Promise<IOrder | []> => {
        const result =  await this.ordersDatabase.selectAllOrders()

        if(!result.length) {
            return []
        }

        // CASO TENHA RESULTADO, É FEITO UM FILTER PARA VERIFICAR SE O APPOINTMENT_DATE MENOR OU IGUAL QUE A DATA ATUAL
        // CASO SEJA TROCA O STATUS PARA "CONCLUÍDO"
        const ordersPending: IProductOrder[] = result.filter(async(order: any, index: number): Promise<void> => {
            if(order.status === "pending" && order.appointmentDate <= new Date()) {
                result[index].status = OrderStatus.COMPLETED
                await this.ordersDatabase.updateOrderStatus(order.id, OrderStatus.COMPLETED)
            }
        })

        await Promise.all(ordersPending)

        return result
    }

    public getOrderDetailsById = async(id: string): Promise<IOrderDetails> => {
        if (!id) {
            throw new MissingParameters("id é obrigatório")
        }

        if (typeof id !== "string") {
            throw new BadRequest("id deve ser uma string")
        }

        const result = await this.ordersDatabase.selectOrderById(id)

        if(!result.length) {
            throw new NotFound("Pedido não encontrado")
        }

        const products: IProductOrder[] = await this.ordersDatabase.selectOrderDetails(id)
         // CASO TENHA RESULTADO, É FEITO UMA CONDIÇÃO PARA VERIFICAR SE O APPOINTMENT_DATE MENOR OU IGUAL QUE A DATA ATUAL
        // CASO SEJA TROCA O STATUS PARA "CONCLUÍDO"
        if(result[0].status === "pending" && result[0].appointmentDate <= new Date()) {
            await this.ordersDatabase.updateOrderStatus(result[0].id, OrderStatus.COMPLETED)
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

