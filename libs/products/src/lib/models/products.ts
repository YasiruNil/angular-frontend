import { Category } from "./category";

export class Product {
    id?: string;
    name?: string;
    image?: string;
    brand?: string;
    price?: number;
    rating?: number;
    images?: string[];
    category?: Category;
    numRevies?: number;
    isFeatured?: Boolean;
    dateCreated?: string;
    description?: string;
    countInStock?: number;
    richDescription?: string;
}