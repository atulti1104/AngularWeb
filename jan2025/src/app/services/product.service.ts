import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  // GET all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  // GET product by id
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
}
