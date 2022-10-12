import { ProductsDatabase } from "../database/ProductsDatabase"
import BadRequest from "../errors/BadRequest"
import NotFound from "../errors/NotFound"
import { IInputProducList, IOutputProductList, Order, Product, Sort } from "../models/Products"

export class ProductsBusiness {

    constructor(
        private productsDatabase: ProductsDatabase
    ) { }

    public getProducts = async (input: IInputProducList): Promise<[] | IOutputProductList> => {

        let { productName, page, quantity, order, sort } = input

        if(isNaN(page) || !page) {
            page = 1
        }

        if(isNaN(quantity) || !quantity) {
            quantity = 10
        }

        if(!productName || typeof productName !== "string") {
            productName = ""
        }

        const count = await this.productsDatabase.selectCountProducts(productName)

        if(!count) {
            return []
        }

        const pages = Math.ceil(count / quantity)

        // CASO SEJA PASSADO UM NÚMERO DE PÁGINA MAIOR QUE O TOTAL DE PÁGINAS
        if(page > pages) {
            page = pages
        }

        if((order !== Order.ASC && order !== Order.DESC) || (sort !== Sort.NAME && sort !== Sort.PRICE)) {
            order = Order.ASC
            sort = Sort.NAME
        }

        const data: IInputProducList = {productName, page, quantity, order, sort}
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
            throw new BadRequest("id inválido")
        }

        const product = await this.productsDatabase.selectProductById({id})

        if(!product.length) {
            throw new NotFound("Produto não encontrado")
        }

        const result: Product = Product.toProductModel(product[0])

        return result

    }
}