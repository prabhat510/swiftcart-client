import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemListingComponent implements OnInit {
  loadingItems = true;
  products: Array<IProduct> = [];
  limit = 10;
  offset = 0;
  totalProducts = 0;
  filterTerm: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.searchTerm.subscribe(res => this.filterTerm = res);
    const queryParams = {
      limit: this.limit,
      offset: this.offset
    };
    this.productService.getAllProducts(queryParams)
    .subscribe({
      next: (res:any)=>{
        this.loadingItems = false;
        this.products = res.products;
        this.totalProducts = res.totalCount;
        console.log('count', this.totalProducts, 'res', this.products);
      },
      error: (error)=>{
        this.loadingItems = false;
        console.log("error fetching products", error);
      }
    })
  }

}
