export interface ISelectPrductDTO {
    id: number
}

export interface IInputProducList {
    page: number,
    quantity: number
}

export interface IOutputProductList {
    list: Product[],
    page: string,
    quantity: number,
    total: number
}


export class Product {
    constructor(
        public productId: string,
        public name: string,
        public price: number,
        public quantidadeStock: number,
    ) {}



    public static toProductModel(product: any): Product {
        return new Product(
            product.id,
            product.name,
            product.price,
            product.qty_stock,
        )
    }
}
