import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) {

  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:4000/api/v1/categories');
  }
  getSingleCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`http://localhost:4000/api/v1/category/${categoryId}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`http://localhost:4000/api/v1/category`, category);
  }
  deleteCategory(categoryId: String): Observable<Object> {
    return this.http.delete<Object>(`http://localhost:4000/api/v1/category/${categoryId}`);
  }
  updateCategory(category: Category, categoryId: string): Observable<Category> {
    return this.http.put<Category>(`http://localhost:4000/api/v1/category/${categoryId}`, category);
  }

}
