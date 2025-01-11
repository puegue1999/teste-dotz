export interface Category {
    id?: number;
    name?: string;
}

export interface Subcategory {
    id?: number;
    category?: number;
    name?: string;
}

export interface Product {
    id?: number;
    name?: string;
    category?: number;
    subcategory?: number;
    price?: number;
    uf?: string;
    avaliable?: boolean;
}
