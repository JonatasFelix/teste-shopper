import app from './controller/app'
import { productsRouter } from './router/ProductsRouter'

import { shoppingCartRouter } from './router/shoppingCartRouter'

app.use("/shoppingCart", shoppingCartRouter)
app.use("/products", productsRouter)