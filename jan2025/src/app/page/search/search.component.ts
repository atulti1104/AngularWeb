import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /* ================= NAV / HEADER ================= */
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  categories = [
    'Home & Living',
    'Jewelry',
    'Art & Collectibles',
    'Clothing',
    'Craft Supplies',
    'Vintage'
  ];

  year = new Date().getFullYear();

  /* ================= CART ================= */
  cartCount = 0;

  /* ================= PRODUCTS ================= */
  products: any[] = [];   // 🔥 backend se aayega

  /* ================= POPUP ================= */
  showPopup = false;
  selectedItem: any = null;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    // ✅ Cart count (old code safe)
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // ✅ Products from backend (new code added)
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Product API Error', err);
      }
    });
  }

  /* ================= POPUP ACTIONS ================= */
  openPopup(item: any) {
    this.selectedItem = item;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedItem = null;
  }

  /* ================= ADD TO CART ================= */
  addToCart() {
    this.cartService.addToCart(this.selectedItem);
    this.closePopup();
  }
}
