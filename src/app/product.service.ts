import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  //Map the JSON data from Spring Data REST to Product array
  public getProducts(): Observable<Product[]>{ 
    return this.httpClient.get<GetResponse>(`${this.apiServerUrl}/products`).pipe(
      map(response => response._embedded.products)
    ); 
  }
}


//Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
