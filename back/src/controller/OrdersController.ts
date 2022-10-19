import { Request, Response } from "express"
import { OrdersBusiness } from "../business/OrdersBusiness"
import { IInputOrder, IInputOrderDetails } from "../models/Orders"


export class OrdersController {
    constructor(
        private ordersBusiness: OrdersBusiness
    ) { }

    public createOrder = async (req: Request, res: Response) => {
        try {
            const input: IInputOrder = {
                token: req.headers.authorization as string,
                products: req.body.products,
                appointmentDate: req.body.appointmentDate
            }

            await this.ordersBusiness.createOrder(input)

            res.status(204).send()

        } catch (error) {
            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
        }

    }

    public getAllOrders = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string

            const result = await this.ordersBusiness.getAllOrders(token)

            res.status(200).send(result)

        } catch (error) {
            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
        }
    }

    public getOrderDetailsById = async (req: Request, res: Response) => {
        try {
            const input: IInputOrderDetails = {
                id: req.params.id,
                token: req.headers.authorization as string
            }

            const result = await this.ordersBusiness.getOrderDetailsById(input)

            res.status(200).send(result)

        } catch (error) {
            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
        }
    }
}
