import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  getPaymentDetails(orderId: string) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/payment/details?orderId=${orderId}`;
    return this.httpClient.get(url);
  }
}
