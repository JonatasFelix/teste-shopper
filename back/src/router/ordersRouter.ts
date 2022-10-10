import { Router } from "express";
import { OrdersBusiness } from "../business/OrdersBusiness";
import { OrdersController } from "../controller/OrdersController";
import { OrdersDatabase } from "../database/OrdersDatabase";
import { ProductsDatabase } from "../database/ProductsDatabase";
import { DateConversion } from "../services/DateConversion";
import { IdGenerator } from "../services/IdGenerator";

export const ordersRouter = Router()

const ordersController = new OrdersController(
    new OrdersBusiness(
        new OrdersDatabase(),
        new ProductsDatabase(),
        new IdGenerator(),
        new DateConversion()
    )
)

ordersRouter.get("/all", ordersController.getAllOrders)
ordersRouter.get("/details/:id", ordersController.getOrderDetailsById)
ordersRouter.post("/", ordersController.createOrder)