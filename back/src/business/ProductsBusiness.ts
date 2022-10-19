import { ProductsDatabase } from "../database/ProductsDatabase"
import { UsersDataBase } from "../database/UsersDataBase"
import BadRequest from "../errors/BadRequest"
import MissingParameters from "../errors/MissingParameters"
import NotFound from "../errors/NotFound"
import Unauthorized from "../errors/Unauthorized"
import { IInputProducList, IOutputProductList, Order, Product, Sort } from "../models/Products"
import { UserHasAddress } from "../models/Users"
import { Authenticator } from "../services/AuthenticatorData"

export class ProductsBusiness {

    constructor(
        private productsDatabase: ProductsDatabase,
        private authenticator: Authenticator,
        private usersDataBase: UsersDataBase,
    ) { }

    public getProducts = async (input: IInputProducList): Promise<[] | IOutputProductList> => {

        let { token, productName, page, quantity, order, sort } = input

        if (!token) {
            throw new BadRequest('Token inválido')
        }

        const tokenData = this.authenticator.getTokenPayload(token)

        if (!tokenData) {
            throw new Unauthorized('Token inválido')
        }

        const user: any = await this.usersDataBase.selectUserById(tokenData.id)

        if (!user.length) {
            throw new Unauthorized("Usuário não encontrado")
        }

        if (user[0].has_address === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não possui endereço cadastrado")
        }

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

    public getProductById = async(id: number, token: string): Promise<any> => {

        if(isNaN(id)) {
            throw new BadRequest("id inválido")
        }

        if (!token) {
            throw new MissingParameters('Token é obrigatório')
        }

        const tokenData = this.authenticator.getTokenPayload(token)

        if (!tokenData) {
            throw new Unauthorized('Token inválido')
        }

        const user: any = await this.usersDataBase.selectUserById(tokenData.id)

        if (!user.length) {
            throw new Unauthorized("Usuário não encontrado")
        }

        if (user[0].has_address === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não possui endereço cadastrado")
        }

        const product = await this.productsDatabase.selectProductById({id})

        if(!product.length) {
            throw new NotFound("Produto não encontrado")
        }

        const result: Product = Product.toProductModel(product[0])

        return result

    }
}