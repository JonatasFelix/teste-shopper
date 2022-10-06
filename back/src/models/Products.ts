export enum Order {
    ASC = 'asc',
    DESC = 'desc'
}

export enum  Sort {
    PRICE = 'price',
    NAME = 'name'
}

export interface ISelectPrductDTO {
    id: number
}

export interface IInputProducList {
    page: number,
    quantity: number,
    order?: Order,
    sort?: Sort
}

export interface IOutputProductList {
    list: Product[],
    page: string,
    quantity: number,
    total: number
    ordened: string
}

export interface ISearchProducByName {
    producName: string,
    page: number,
    quantity: number,
    order?: Order,
    sort?: Sort
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
