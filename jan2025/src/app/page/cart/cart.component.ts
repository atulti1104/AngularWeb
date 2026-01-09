// year = new Date().getFullYear();
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService,CartItem } from '../../services/cart.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  increaseQty(id: number) {
    this.cartService.increaseQty(id);
  }

  decreaseQty(id: number) {
    this.cartService.decreaseQty(id);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  orderNow() {
    // 👉 Payment page redirect
    this.router.navigate(['/payment']);
  }
  year = new Date().getFullYear();
}
