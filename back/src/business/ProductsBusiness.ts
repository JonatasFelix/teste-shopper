import { ProductsDatabase } from "../database/ProductsDatabase"
import BadRequest from "../errors/BadRequest"
import NotFound from "../errors/NotFound"
import { IInputProducList, IOutputProductList, Product } from "../models/Products"

export class ProductsBusiness {

    constructor(
        private productsDatabase: ProductsDatabase
    ) { }

    public getProducts = async (input: IInputProducList): Promise<IOutputProductList> => {

        let page = input.page
        let quantity = input.quantity

        if(isNaN(page) || !page) {
            page = 1
        }

        if(isNaN(quantity) || !quantity) {
            quantity = 10
        }

        const count = await this.productsDatabase.selectCountProducts()
        const pages = Math.ceil(count / quantity)

        if(page > pages) {
            page = pages
        }

        const data: IInputProducList = {page, quantity}
        const products = await this.productsDatabase.selectAllProducts(data)


        if(!products.length) {
            throw new NotFound("No products found")
        }

        const productsList: Product[] = products.map((product: any) => {
            return Product.toProductModel(product)
        })

        const result: IOutputProductList = {
            list: productsList,
            page: `${page} of ${pages}`,
            quantity: quantity,
            total: count
        }

        return result

    }

    public getProductById = async(id: number): Promise<any> => {

        if(isNaN(id)) {
            throw new BadRequest("Invalid id")
        }

        const product = await this.productsDatabase.selectProductById({id})

        if(!product.length) {
            throw new NotFound("Product not found")
        }

        const result = Product.toProductModel(product[0])

        return result

    }
}