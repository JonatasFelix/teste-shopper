import { ProductsDatabase } from "../database/ProductsDatabase"
import BadRequest from "../errors/BadRequest"
import NotFound from "../errors/NotFound"
import { IInputProducList, IOutputProductList, ISearchProducByName, Order, Product, Sort } from "../models/Products"

export class ProductsBusiness {

    constructor(
        private productsDatabase: ProductsDatabase
    ) { }

    public getProducts = async (input: IInputProducList): Promise<IOutputProductList> => {

        let { page, quantity, order, sort } = input

        if(isNaN(page) || !page) {
            page = 1
        }

        if(isNaN(quantity) || !quantity) {
            quantity = 10
        }

        const count = await this.productsDatabase.selectCountProducts()

        if(!count) {
            throw new NotFound("No products found")
        }

        const pages = Math.ceil(count / quantity)

        if(page > pages) {
            page = pages
        }

        if((order !== Order.ASC && order !== Order.DESC) || (sort !== Sort.NAME && sort !== Sort.PRICE)) {
            order = Order.ASC
            sort = Sort.NAME
        }

        const data: IInputProducList = { page, quantity, order, sort}
        const products = await this.productsDatabase.selectAllProducts(data)


        const productsList: Product[] = products.map((product: any) => {
            return Product.toProductModel(product)
        })

        const result: IOutputProductList = {
            list: productsList,
            page: `${page} of ${pages}`,
            quantity: quantity,
            total: count,
            ordened: `${order} ${sort}`
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

        const result: Product = Product.toProductModel(product[0])

        return result

    }

    public searchProductByName = async(input: ISearchProducByName): Promise<void | IOutputProductList> => {
        
        let {producName, page, quantity, order, sort} = input

        if(!producName) {
            throw new BadRequest("Invalid name")
        }

        if(isNaN(page) || !page) {
            page = 1
        }

        if(isNaN(quantity) || !quantity) {
            quantity = 10
        }

        const count = await this.productsDatabase.selectCountProductsByName(producName)

        if(!count) {
            throw new NotFound("No products found")
        }

        const pages = Math.ceil(count / quantity)
        if(page > pages) {
            page = pages
        }

        if((order !== Order.ASC && order !== Order.DESC) || (sort !== Sort.NAME && sort !== Sort.PRICE)) {
            order = Order.ASC
            sort = Sort.NAME
        } 

        const data: ISearchProducByName = {producName, page, quantity, order, sort}
        const products = await this.productsDatabase.selectProductsByName(data)

        const productsList: Product[] = products.map((product: any) => {
            return Product.toProductModel(product)
        })

        const result: IOutputProductList = {
            list: productsList,
            page: `${page} of ${pages}`,
            quantity: quantity,
            total: count,
            ordened: `${order} ${sort}` 
        }
        
        return result

    }
}