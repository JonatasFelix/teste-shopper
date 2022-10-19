export interface IUpdateProductQuantity {
    token: string,
    productId: number,
    quantity: number
}

export interface IUpdateProductQuantityDTO {
    product_id: number,
    quantity: number
    user_id: string
}


export interface IRemoveProduct {
    token: string,
    productId: number
}

export interface IRemoveProductDTO {
    product_id: number
    user_id: string
}

export interface IAddProductCart {
    token: string,
    productId: number
}

export interface IAddProductCartDTO {
    user_id: string,
    product_id: number,
    quantity: number
}


export interface ISelectCartPrductDTO {
    product_id: number
    user_id: string
}

export interface IShoppingCartList {
    list: ShoppingCartProduct[],
    outStock: ShoppingCartProduct[],
    totalValue: number,
    totalQuantity: number
}



export class ShoppingCartProduct {
    constructor(
        public productId: number,
        public name: string,
        public price: number,
        public quantityStock: number,
        public quantity: number
    ) {}



    public static toShoppingCartProductModel(product: any): ShoppingCartProduct {
        return new ShoppingCartProduct(
            product.id,
            product.name,
            product.price,
            product.qty_stock,
            product.quantity
        )
    }
}