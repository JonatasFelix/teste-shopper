import app from './controller/app'

import { shoppingCartRouter } from './router/shoppingCartRouter'
import { ordersRouter } from './router/ordersRouter'
import { productsRouter } from './router/productsRouter'


app.use("/shoppingCart", shoppingCartRouter)
app.use("/products", productsRouter)
app.use("/orders", ordersRouter)