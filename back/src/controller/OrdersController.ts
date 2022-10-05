import { Request, Response } from "express"
import { IInputOrder } from "../models/Orders"


export class OrdersController {
    constructor(
        private ordersBusiness: OrdersBusiness
    ) { }

    public async createOrder(req: Request, res: Response) {
        try {
            const input: IInputOrder = {
                userName: req.body.userName,
                products: req.body.products,
                appointmentDate: req.body.appointmentDate
            }

            const order = await this.ordersBusiness.createOrder(input)

            res.status(200).send(order)

        } catch (error) {
            res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
        }





}