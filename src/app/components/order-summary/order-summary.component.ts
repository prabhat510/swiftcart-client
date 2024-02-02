import { Component, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  payment:any;
  orderId:any = '';
  displayName:string;
  orderData = {
    created: '',
    items: [],
    orderId: '',
    paymentStatus: 'pending',
    shippingAddress: '',
    amount: 0,
    userId: ''
  }
  constructor(private orderService: OrderService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.orderId = queryParams.get('orderId');
    if(this.orderId) {
      this.fetchOrderDetails();
    }
    this.fetchPaymentDetails();
  }

  generateAndOpenPDF() {
    const pdf = new jsPDF();

    // Add content to the PDF using the fetched data
    pdf.text(this.formatter(), 10, 20);

    // Open the PDF in a new tab
    const pdfData = pdf.output();
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  formatter(){
    let res = `Hi ${this.displayName}, Your Order has been placed successfully\n\n\n\n`;
    
    for(let item of this.orderData.items){
      const product = item.product;

      for(let prop in product){
        if(['_id', '__v', 'isAvailable', 'image', 'productIdentifier', 'rating', 'description'].indexOf(prop)>-1) {
          continue;
        }
        if(prop === 'price') {
          res += (prop + ' : Rs. ' + product[prop] + '\n\n');
        } else {
          res += (prop + ' : ' + product[prop] + '\n\n');
        }
      }
      res += ("quantity" + ' : ' + item.quantity + '\n\n');
      res += ' ------------------------------------------------------- \n\n';

    }

    res += 'Total amount paid(including taxes) : Rs. ' + this.orderData.amount + '\n\n';

    res += 'Shipping Address  : ' + this.orderData.shippingAddress + '\n\n';


    res += '\n\nThank you for shopping with swiftcart.com!!!!\n\n'



    return res;
  }

  fetchPaymentDetails() {
    this.paymentService.getPaymentDetails(this.orderId)
    .subscribe({
      next:(res:any)=>{
        this.payment = res.payment;
        console.log("payment details::", res);
      },
      error: (error)=>{
        console.log("error getting payment details", error);
      }
    })
  }

  fetchOrderDetails() {
    this.orderService.getOrderDetails(this.orderId)
    .subscribe({
      next: (res: any)=>{
        if(res) {
          if(res.paymentStatus.includes('success')) {
            // payment for order was successful, clear cart items
            this.clearCartItems();
          }
          this.orderData.created = res.createdAt;
          this.orderData.items = res.items;
          this.orderData.orderId = res.orderId;
          this.orderData.paymentStatus = res.paymentStatus;
          this.orderData.shippingAddress = res.shippingAddress;
          this.orderData.amount = res.totalAmount;
          this.orderData.userId = res.user?._id;
          this.displayName = res.user?.name;
        }
        console.log('order api response', res);
      },
      error: (error)=>{
        console.log("error getting order details", error)
      }
    })
  }

  clearCartItems() {
    this.cartService.clearCartItems()
    .subscribe({
      next: (res)=>{
        console.log("cart cleared::", res);
        this.cartService.cartUpdateSubject.next(0);
      },
     error: (error)=>{
      console.log("error in clearing cart items::", error);
     }
    })
  }
}
