import { Router } from 'express'
import { ShoppingCartBusiness } from '../business/ShoppingCartBusiness'
import { ShoppingCartController } from '../controller/ShoppingCartController'
import { ProductsDatabase } from '../database/ProductsDatabase'
import { ShoppingCartDatabase } from '../database/ShoppingCartDatabase'


export const shoppingCartRouter = Router()

const shoppingCartController = new ShoppingCartController(
    new ShoppingCartBusiness(
        new ShoppingCartDatabase(),
        new ProductsDatabase()
    )
)

shoppingCartRouter.get("/", shoppingCartController.getCart)
shoppingCartRouter.post('/:productId', shoppingCartController.addProduct)
shoppingCartRouter.put('/:productId', shoppingCartController.updateProductQuantity)
shoppingCartRouter.delete('/:productId', shoppingCartController.removeProduct)

