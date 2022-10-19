import { Request, Response } from "express";
import { ShoppingCartBusiness } from "../business/ShoppingCartBusiness";
import { IAddProductCart, IUpdateProductQuantity, IRemoveProduct } from "../models/ShoppingCart";

export class ShoppingCartController {
    constructor(
        private shoppingCartBusiness: ShoppingCartBusiness
    ) {}

        public removeProduct = async (req: Request, res: Response) => {
            try {
                const input: IRemoveProduct = {
                    token: req.headers.authorization as string,
                    productId: Number(req.params.productId)
                }
                await this.shoppingCartBusiness.removeProduct(input)

                res.status(204).send()
            } catch (error) {
                res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
            }
        }

        public updateProductQuantity = async (req: Request, res: Response) => {
            try {

                const input: IUpdateProductQuantity = {
                    token: req.headers.authorization as string,
                    productId: Number(req.params.productId),
                    quantity: req.body.quantity
                }

                await this.shoppingCartBusiness.updateProductQuantity(input)

                res.status(204).send()
            } catch (error) {
                res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
            }
        }

        public addProduct = async (req: Request, res: Response) => {
            try {
                const input: IAddProductCart = {
                    token: req.headers.authorization as string,
                    productId: Number(req.params.productId),
                }

                await this.shoppingCartBusiness.addProduct(input)

                res.status(204).send()
            } catch (error) {
                res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
            }
        }

        public getCart = async (req: Request, res: Response) => {
            try {
                const token = req.headers.authorization as string

                const cart = await this.shoppingCartBusiness.getCart(token)

                res.status(200).send(cart)
            } catch (error) {
                res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
            }
        }

        public clearCart = async (req: Request, res: Response) => {
            try {
                const token = req.headers.authorization as string

                await this.shoppingCartBusiness.clearCart(token)

                res.status(204).send()
            } catch (error) {
                res.status(error.statusCode || 500).send({ error: error.message || error.sqlMessage })
            }
        }

}