export interface IUpdateProductQuantity {
    productId: number,
    quantity: number
}

export interface IUpdateProductQuantityDTO {
    id_product: number,
    quantity: number
}


export interface IRemoveProduct {
    productId: number
}

export interface IRemoveProductDTO {
    id_product: number
}

export interface IAddProductCart {
    productId: number
}

export interface IAddProductCartDTO {
    id_product: number,
    quantity: number
}


export interface ISelectCartPrductDTO {
    id_product: number
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