import { ProductsDatabase } from "../database/ProductsDatabase";
import { ShoppingCartDatabase } from "../database/ShoppingCartDatabase";
import BadRequest from "../errors/BadRequest";
import NotFound from "../errors/NotFound";
import { IAddProductCart, IAddProductCartDTO, IRemoveProduct, IRemoveProductDTO, ISelectCartPrductDTO, IShoppingCartList, IUpdateProductQuantity, IUpdateProductQuantityDTO, ShoppingCartProduct } from "../models/ShoppingCart";
import { ISelectPrductDTO } from "../models/Products";
import Conflict from "../errors/Conflict";
import { Authenticator } from "../services/AuthenticatorData";
import Unauthorized from "../errors/Unauthorized";
import { UserHasAddress } from "../models/Users";

export class ShoppingCartBusiness {
    constructor(
        private shoppingCartDatabase: ShoppingCartDatabase,
        private productsDatabase: ProductsDatabase,
        private authenticator: Authenticator
    ) {}



    public removeProduct = async (input: IRemoveProduct): Promise<boolean> => {
        const token = input.token
        const productId = input.productId

        if(isNaN(productId) || !productId) {
            throw new BadRequest("id é obrigatório")
        }

        if(!token) {
            throw new BadRequest("token é obrigatório")
        }

        const tokenPayload = this.authenticator.getTokenPayload(token)

        if(!tokenPayload) {
            throw new Unauthorized("token inválido")
        }

        if(tokenPayload.hasAddress === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não tem endereço cadastrado")
        }


        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Produto não encontrado")
        }

        const inputSelectCart: ISelectCartPrductDTO = { product_id: productId, user_id: tokenPayload.id }
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        if(!product.length) {
            throw new NotFound("Este produto não está no carrinho")
        }

        const inputDelete: IRemoveProductDTO = { product_id: productId, user_id: tokenPayload.id }
        await this.shoppingCartDatabase.deleteProduct(inputDelete)

        return true
    }

    public updateProductQuantity = async (input: IUpdateProductQuantity): Promise<boolean> => {
        const productId = input.productId
        const quantity = input.quantity
        const token = input.token

        if(isNaN(productId) || !productId ) {
            throw new BadRequest("id é obrigatório")
        }

        if((isNaN(quantity) || !quantity) && quantity !== 0) {
            throw new BadRequest("quantity é obrigatório")
        }

        if(quantity < 1) {
            throw new BadRequest("quantity deve ser maior que 0, ou remova o produto do carrinho")
        }

        const tokenPayload = this.authenticator.getTokenPayload(token)

        if(!tokenPayload) {
            throw new Unauthorized("token inválido")
        }

        if(tokenPayload.hasAddress === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não tem endereço cadastrado")
        }

        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Produto não encontrado")
        }

        if(quantity > prdouctExists[0].qty_stock) {
            throw new BadRequest(`Quantidade em estoque insuficiente, temos apenas ${prdouctExists[0].qty_stock} unidades`)
        }

        const inputSelectCart: ISelectCartPrductDTO = { product_id: productId, user_id: tokenPayload.id }
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        if(!product.length) {
            throw new NotFound("Este produto não está no carrinho")
        }

        const inputUpdate: IUpdateProductQuantityDTO = { product_id: productId, quantity, user_id: tokenPayload.id }
        await this.shoppingCartDatabase.updateProduct(inputUpdate)

        return true
    }

    public addProduct = async (input: IAddProductCart): Promise<boolean> => {

        const productId = input.productId
        const token = input.token

        if(isNaN(productId) || !productId) {
            throw new BadRequest("id é obrigatório")
        }

        if(!token) {
            throw new BadRequest("token é obrigatório")
        }

        const tokenPayload = this.authenticator.getTokenPayload(token)

        if(!tokenPayload) {
            throw new Unauthorized("token inválido")
        }

        if(tokenPayload.hasAddress === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não tem endereço cadastrado")
        }

        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Produto não encontrado")
        }

        const inputSelectCart: ISelectCartPrductDTO = { product_id: productId, user_id: tokenPayload.id }
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        if(product.length) {
            throw new Conflict("Este produto já está no carrinho")
        }

        if(prdouctExists[0].qty_stock === 0) {
            throw new BadRequest("Produto indisponível")
        }

        const inputAdd: IAddProductCartDTO = { product_id: productId, quantity: 1, user_id: tokenPayload.id }
        await this.shoppingCartDatabase.insertProduct(inputAdd)

        return true
    }

    public getCart = async (token: string): Promise<IShoppingCartList | []> => {
        
        if(!token) {
            throw new BadRequest("token é obrigatório")
        }

        const tokenPayload = this.authenticator.getTokenPayload(token)

        if(!tokenPayload) {
            throw new Unauthorized("token inválido")
        }

        if(tokenPayload.hasAddress === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não tem endereço cadastrado")
        }


        const products = await this.shoppingCartDatabase.selectAllProducts(tokenPayload.id)

        if(!products.length) {
            return []
        }

        const productsInStock: ShoppingCartProduct[] = []
        const productsOutOfStock: ShoppingCartProduct[] = []

        let totalValue = 0
        let totalQuantity = 0

        products.forEach((product: ShoppingCartProduct) => {
            product = ShoppingCartProduct.toShoppingCartProductModel(product)
            if(product.quantityStock > 0) {
                productsInStock.push(product)
                totalValue += product.price * product.quantity
                totalQuantity += product.quantity
            } else {
                productsOutOfStock.push(product)
            }
        });

        totalValue = Number(totalValue.toFixed(2))

        const result: IShoppingCartList = { list: productsInStock, totalValue, totalQuantity, outStock: productsOutOfStock }

        return result
    }

    public clearCart = async (token: string): Promise<boolean> => {

        if(!token) {
            throw new BadRequest("token é obrigatório")
        }

        const tokenPayload = this.authenticator.getTokenPayload(token)

        if(!tokenPayload) {
            throw new Unauthorized("token inválido")
        }

        if(tokenPayload.hasAddress === UserHasAddress.DONT_HAVE) {
            throw new Unauthorized("Usuário não tem endereço cadastrado")
        }

        await this.shoppingCartDatabase.deleteAllProducts(tokenPayload.id)
        return true
    }

}