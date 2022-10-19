import { Router } from 'express'
import { ProductsBusiness } from '../business/ProductsBusiness'
import { ProductsController } from '../controller/ProductsController'
import { ProductsDatabase } from '../database/ProductsDatabase'
import { UsersDataBase } from '../database/UsersDataBase'
import { Authenticator } from '../services/AuthenticatorData'


export const productsRouter = Router()

const productsController = new ProductsController(
    new ProductsBusiness(
        new ProductsDatabase(),
        new Authenticator(),
        new UsersDataBase()
    )
)

productsRouter.get("/", productsController.getProducts)
productsRouter.get("/:productId", productsController.getProductById)
