import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Add this
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Product } from '../../Interface/Product';
import { ProductCard } from '../product-card/product-card';


@Component({
  selector: 'app-product-list',
  standalone: true, // Ensure this is present
  imports: [CommonModule, HttpClientModule, ProductCard],
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  products: Product[] = [  {
     "productId" : "298347A-61C9-474A-18B3-08DE7EC41EF5",
  "productName" : "test",
  "productDescription" : "test",
  "unitPrice" : 232,
  "inStock" : 3423,
  "productImgURL" : "/Products/product2.jpeg",
  "productImgUrl2" : "/Products/product2.jpg"
  }];

  loading = true;

  // 2. Inject ChangeDetectorRef
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.http.get<Product[]>('https://localhost:7132/api/product')
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
          
          // 3. Manually tell Angular to check the view
          this.cdr.detectChanges(); 
          
          console.log('Fetched products:', this.products);
        },
        error: (err) => {
          console.error('Failed to fetch products', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }
}