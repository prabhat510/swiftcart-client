import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderData } from 'src/app/interfaces/order.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss']
})
export class OrderListingComponent implements OnInit {

  orderData: Array<IOrderData> = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrdersList()
    .subscribe({
      next:(res: any)=>{
        if(res) {
          console.log("res::", res);
          for(const data of res) {
            for(const item of data.items) {
              this.orderData.push({
                order: item,
                date: data.createdAt
              });
            }
          }
        }
      }
    })
  }

}
