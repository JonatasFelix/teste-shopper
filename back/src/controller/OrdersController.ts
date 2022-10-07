import { Request, Response } from "express"
import { OrdersBusiness } from "../business/OrdersBusiness"
import { IInputOrder } from "../models/Orders"


export class OrdersController {
    constructor(
        private ordersBusiness: OrdersBusiness
    ) { }

    public createOrder = async (req: Request, res: Response) => {
        try {
            const input: IInputOrder = {
                userName: req.body.userName,
                products: req.body.products,
                appointmentDate: req.body.appointmentDate as Date
            }

            await this.ordersBusiness.createOrder(input)

            res.status(204).send()

        } catch (error) {
            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
        }

    }




}