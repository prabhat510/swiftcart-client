import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IOrderData } from 'src/app/interfaces/order.interface';
import { GlobalUtil } from 'src/app/utils/global.util';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {
  
  util:GlobalUtil;
  @Input() orderData:IOrderData;
  constructor() {
    this.util = new GlobalUtil();
   }

  ngOnInit(): void {
  }

}
