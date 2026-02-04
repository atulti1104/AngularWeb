

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {


  navOpen = false;

toggleNav() {
  this.navOpen = !this.navOpen;
}
cartCount = 0;

  product: any;
  loading = true;
  qty = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 🔹 Get product ID from URL
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      console.error('Product ID missing in route');
      this.router.navigate(['/search']);
      return;
    }

    const id = Number(idParam);

    // 🔹 Fetch product from backend API
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        console.log('Loaded product:', data);
      },
      error: (err) => {
        console.error('Product API Error', err);
        this.router.navigate(['/search']);
      }
    });
  }

  // 🔹 ADD TO CART + BUY NOW (same flow)
  orderNow() {

    const cartItem = {
      ...this.product,
      quantity: this.qty
    };

    this.cartService.addToCart(cartItem);

    // redirect to cart page
    this.router.navigate(['/cart']);
  }

}
