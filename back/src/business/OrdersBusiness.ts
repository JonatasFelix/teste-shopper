import BadRequest from "../errors/BadRequest";
import MissingParameters from "../errors/MissingParameters";
import { IInputOrder, IProduct } from "../models/Orders";

export class OrdersBusiness {

    public createOrder = async(input: IInputOrder): Promise<any> => {
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

            const productsList = products.map((product: any): void | IProduct=> {
                if (typeof product.id !== "number") {
                    throw new BadRequest("id must be a number")
                }

                if (typeof product.quantity !== "number") {
                    throw new BadRequest("quantity must be a number")
                }

                return {
                    id: product.id as number,
                    quantity: product.quantity as number
                }
            })




    }
}