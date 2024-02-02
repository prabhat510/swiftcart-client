import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartUpdateSubject = new Subject<Number>();
  constructor(private httpClient: HttpClient) { }

  addProductToCart(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/addItem`;
    return this.httpClient.post(url, productPayload);
  }

  checkItemAddedToCart(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/item/exists`;
    return this.httpClient.post(url, productPayload);
  }

  getAllProductsInCart() {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/items`;
    return this.httpClient.get(url);
  }

  updateCart(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/update`;
    return this.httpClient.put(url, productPayload);
  }

  createUserCart(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/create`;
    return this.httpClient.post(url, productPayload);
  }

  removeCartItem(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/remove`;
    return this.httpClient.delete(url, {body: productPayload});
  }
  
  clearCartItems() {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/remove/items`;
    return this.httpClient.delete(url, {responseType: 'text'});
  }

  getCartItemsCount() {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/count`;
    return this.httpClient.get(url);
  }
}
