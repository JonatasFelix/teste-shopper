import { Router } from 'express'
import { ProductsBusiness } from '../business/ProductsBusiness'
import { ProductsController } from '../controller/ProductsController'
import { ProductsDatabase } from '../database/ProductsDatabase'


export const productsRouter = Router()

const productsController = new ProductsController(
    new ProductsBusiness(
        new ProductsDatabase()
    )
)

productsRouter.get("/", productsController.getProducts)
productsRouter.get("/:productId", productsController.getProductById)