import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {

  }

  getProducts(catValue?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (catValue && catValue.length > 0) {
      params = params.append('category', catValue.join(','))
      return this.http.get<Product[]>('http://localhost:4000/api/v1/products', { params });
    }
    return this.http.get<Product[]>('http://localhost:4000/api/v1/products');
  }
  getSingleProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:4000/api/v1/product/${productId}`);
  }
  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(`http://localhost:4000/api/v1/product`, product);
  }
  deleteProduct(productId: String): Observable<Object> {
    return this.http.delete<Object>(`http://localhost:4000/api/v1/product/${productId}`);
  }
  updateProduct(product: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`http://localhost:4000/api/v1/product/${productId}`, product);
  }
  getProductConut(): any {
    return this.http.get<any>(`http://localhost:4000/api/v1/product/count`);
  }
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:4000/api/v1/product/featured/${count}`);

  }

}
