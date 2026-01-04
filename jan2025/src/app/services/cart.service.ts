import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // 🧠 Internal cart data
  private cartItems: CartItem[] = [];

  // 🔔 Observable for cart count (navbar badge)
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  // 🔔 Observable for full cart items (cart page)
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // ✅ Add item to cart
  addToCart(product: any) {
    const existingItem = this.cartItems.find(
      item => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    this.updateCartState();
  }

  // ✅ Remove item completely
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(
      item => item.id !== productId
    );

    this.updateCartState();
  }

  // ✅ Increase quantity
  increaseQty(productId: number) {
    const item = this.cartItems.find(i => i.id === productId);
    if (item) {
      item.quantity += 1;
      this.updateCartState();
    }
  }

  // ✅ Decrease quantity
  decreaseQty(productId: number) {
    const item = this.cartItems.find(i => i.id === productId);
    if (!item) return;

    item.quantity -= 1;

    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.updateCartState();
    }
  }

  // ✅ Clear full cart
  clearCart() {
    this.cartItems = [];
    this.updateCartState();
  }

  // ✅ Get total price
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // 🔄 Update observables
    private updateCartState() {
    const totalQty = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    this.cartCountSubject.next(totalQty);
    this.cartItemsSubject.next([...this.cartItems]);
  }
}
