import { Request, Response } from "express";
import { ProductsBusiness } from "../business/ProductsBusiness";
import { IInputProducList } from "../models/Products";


export class ProductsController {

    constructor(
        private productsBusiness: ProductsBusiness
    ) { }

    public getProducts = async (req: Request, res: Response) => {
        try {
            const input: IInputProducList = {
                page : Number(req.query.page),
                quantity: Number(req.query.quantity)
            }

            const products = await this.productsBusiness.getProducts(input)

            res.status(200).send(products)

        } catch (error) {
            res.status(error.statusCode || 500).send({ error: error.message })
        }
    }

    public getProductById = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id)

            const product = await this.productsBusiness.getProductById(id)

            res.status(200).send(product)
        } catch (error) {
            res.status(error.statusCode || 500).send({ error: error.message })
        }
    }
}