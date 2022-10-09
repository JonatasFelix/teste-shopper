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

        if(isNaN(productId)) {
            throw new BadRequest("quantityStock")
        }

        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Product not found")
        }

        const inputSelectCart: ISelectCartPrductDTO = { id_product: productId }
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        if(!product.length) {
            throw new NotFound("This product is not in your shopping cart")
        }

        const inputDelete: IRemoveProductDTO = { id_product: productId }
        await this.shoppingCartDatabase.deleteProduct(inputDelete)

        return true
    }

    public updateProductQuantity = async (input :IUpdateProductQuantity): Promise<boolean> => {
        const productId = input.productId
        const quantity = input.quantity

        if(isNaN(productId)) {
            throw new BadRequest("id must be a number")
        }

        if(isNaN(quantity)) {
            throw new BadRequest("quantity must be a number")
        }

        if(quantity < 1) {
            throw new BadRequest("quantity must be greater than 0, or remove the product")
        }

        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Product not found")
        }

        if(quantity > prdouctExists[0].qty_stock) {
            throw new BadRequest("Insufficient stock")
        }

        const inputSelectCart: ISelectCartPrductDTO = { id_product: productId }
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        if(!product.length) {
            throw new NotFound("This product is not in your shopping cart")
        }

        const inputUpdate: IUpdateProductQuantityDTO = { id_product: productId, quantity }
        await this.shoppingCartDatabase.updateProduct(inputUpdate)

        return true
    }

    public addProduct = async (input: IAddProductCart): Promise<boolean> => {

        const productId = input.productId

        if(isNaN(productId)) {
            throw new BadRequest("id must be a number")
        }

        const inputSelectProduct: ISelectPrductDTO = { id: productId }
        const prdouctExists = await this.productsDatabase.selectProductById(inputSelectProduct)

        if(!prdouctExists.length) {
            throw new NotFound("Product not found")
        }

        const inputSelectCart: ISelectCartPrductDTO = { id_product: productId }
        const product = await this.shoppingCartDatabase.selectProduct(inputSelectCart)

        if(product.length) {
            throw new Conflict("This product is already in your shopping cart")
        }

        if(prdouctExists[0].qty_stock === 0) {
            throw new BadRequest("Insufficient stock")
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

    public clearCart = async (): Promise<boolean> => {
        await this.shoppingCartDatabase.deleteAllProducts()
        return true
    }

}