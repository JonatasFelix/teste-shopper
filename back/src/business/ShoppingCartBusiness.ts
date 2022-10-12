import { ProductsDatabase } from "../database/ProductsDatabase";
import { ShoppingCartDatabase } from "../database/ShoppingCartDatabase";
import BadRequest from "../errors/BadRequest";
import NotFound from "../errors/NotFound";
import { IAddProductCart, IAddProductCartDTO, IRemoveProduct, IRemoveProductDTO, ISelectCartPrductDTO, IShoppingCartList, IUpdateProductQuantity, IUpdateProductQuantityDTO, ShoppingCartProduct } from "../models/ShoppingCart";
import { ISelectPrductDTO } from "../models/Products";
import Conflict from "../errors/Conflict";

export class ShoppingCartBusiness {
    constructor(
        private shoppingCartDatabase: ShoppingCartDatabase,
        private productsDatabase: ProductsDatabase
    ) { }

    public removeProduct = async (input: IRemoveProduct): Promise<boolean> => {
        const productId = input.productId

        if(isNaN(productId) || !productId) {
            throw new BadRequest("id é obrigatório")
        }

        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Produto não encontrado")
        }

        const inputSelectCart: ISelectCartPrductDTO = { id_product: productId }
        // VERIFICA SE O PRODUTO ESTÁ NO CARRINHO
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        // SE NÃO ESTIVER, RETORNA ERRO
        if(!product.length) {
            throw new NotFound("Este produto não está no carrinho")
        }

        const inputDelete: IRemoveProductDTO = { id_product: productId }
        await this.shoppingCartDatabase.deleteProduct(inputDelete)

        return true
    }

    public updateProductQuantity = async (input :IUpdateProductQuantity): Promise<boolean> => {
        const productId = input.productId
        const quantity = input.quantity

        if(isNaN(productId) || !productId ) {
            throw new BadRequest("id é obrigatório")
        }

        if((isNaN(quantity) || !quantity) && quantity !== 0) {
            throw new BadRequest("quantity é obrigatório")
        }

        if(quantity < 1) {
            throw new BadRequest("quantity deve ser maior que 0, ou remova o produto do carrinho")
        }

        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Produto não encontrado")
        }

        // CASO A QUANTIDADE DESEJADA SEJA MAIOR QUE A DISPONÍVEL EM ESTOQUE RETORNA ERRO
        if(quantity > prdouctExists[0].qty_stock) {
            throw new BadRequest(`Quantidade em estoque insuficiente, temos apenas ${prdouctExists[0].qty_stock} unidades`)
        }

        const inputSelectCart: ISelectCartPrductDTO = { id_product: productId }
        // VERIFICA SE O PRODUTO ESTÁ NO CARRINHO
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        // SE NÃO ESTIVER, RETORNA ERRO
        if(!product.length) {
            throw new NotFound("Este produto não está no carrinho")
        }

        const inputUpdate: IUpdateProductQuantityDTO = { id_product: productId, quantity }
        await this.shoppingCartDatabase.updateProduct(inputUpdate)

        return true
    }

    public addProduct = async (input: IAddProductCart): Promise<boolean> => {

        const productId = input.productId

        if(isNaN(productId) || !productId) {
            throw new BadRequest("id é obrigatório")
        }

        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Produto não encontrado")
        }

        const inputSelectCart: ISelectCartPrductDTO = { id_product: productId }
        // VERIFICA SE O PRODUTO ESTÁ NO CARRINHO
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        // SE ESTIVER, RETORNA ERRO
        if(product.length) {
            throw new Conflict("Este produto já está no carrinho")
        }

        // CASO A QUANTIDADE DESEJADA SEJA MAIOR QUE A DISPONÍVEL EM ESTOQUE RETORNA ERRO
        if(prdouctExists[0].qty_stock === 0) {
            throw new BadRequest("Produto indisponível")
        }

        const inputAdd: IAddProductCartDTO = { id_product: productId, quantity: 1 }
        await this.shoppingCartDatabase.insertProduct(inputAdd)

        return true
    }

    public getCart = async (): Promise<IShoppingCartList | []> => {
        
        const products = await this.shoppingCartDatabase.selectAllProducts()

        if(!products.length) {
            return []
        }

        const productsInStock: ShoppingCartProduct[] = []
        const productsOutOfStock: ShoppingCartProduct[] = []

        let totalValue = 0
        let totalQuantity = 0

        // SEPARA OS PRODUTOS EM ESTOQUE E FORA DE ESTOQUE QUE ESTÃO NO CARRINHO
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

        const result: IShoppingCartList = { 
            list: productsInStock, 
            totalValue, 
            totalQuantity, 
            outStock: productsOutOfStock 
        }

        return result
    }

    // REMOVE TODOS OS PRODUTOS DO CARRINHO
    public clearCart = async (): Promise<boolean> => {
        await this.shoppingCartDatabase.deleteAllProducts()
        return true
    }

}