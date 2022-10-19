import { Router } from 'express'
import { ShoppingCartBusiness } from '../business/ShoppingCartBusiness'
import { ShoppingCartController } from '../controller/ShoppingCartController'
import { ProductsDatabase } from '../database/ProductsDatabase'
import { ShoppingCartDatabase } from '../database/ShoppingCartDatabase'
import { Authenticator } from '../services/AuthenticatorData'


export const shoppingCartRouter = Router()

const shoppingCartController = new ShoppingCartController(
    new ShoppingCartBusiness(
        new ShoppingCartDatabase(),
        new ProductsDatabase(),
        new Authenticator()
    )
)

shoppingCartRouter.get("/", shoppingCartController.getCart)
shoppingCartRouter.post('/:productId', shoppingCartController.addProduct)
shoppingCartRouter.put('/:productId', shoppingCartController.updateProductQuantity)
shoppingCartRouter.delete('/all', shoppingCartController.clearCart)
shoppingCartRouter.delete('/:productId', shoppingCartController.removeProduct)

