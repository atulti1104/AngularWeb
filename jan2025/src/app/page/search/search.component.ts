import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { AssistantComponent } from "../../components/chatbot/chatbot.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AssistantComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  navOpen = false;

toggleNav() {
  this.navOpen = !this.navOpen;
}


  year = new Date().getFullYear();

  /* ================= SEARCH === highlight category if matches search================= */
  searchText = '';
  
  isCategoryMatch(categoryName: string): boolean {
    if (!this.searchText) return false;

    return categoryName
      .toLowerCase()
      .includes(this.searchText.toLowerCase());
  }

   // products section reference (scroll)
  @ViewChild('productsSection') productsSection!: ElementRef;

  scrollToProducts() {
    this.productsSection?.nativeElement.scrollIntoView({
      behavior: 'smooth'
    });
  }
  /* ================= CATEGORIES ================= */
  categories: any[] = [];

  /* ================= CART ================= */
  cartCount = 0;

  /* ================= PRODUCTS ================= */
  products: any[] = [];

  /* ================= POPUP ================= */
  showPopup = false;
  selectedItem: any = null;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {

    /* ===== CART COUNT ===== */
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    /* ===== PRODUCTS ===== */
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Product API Error', err)
    });

    /* ===== CATEGORIES ===== */
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Category API Error', err)
    });
  }

  /* ================= POPUP ACTIONS ================= */
  openPopup(item: any) {
    console.log('Product clicked:', item);
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

  openProductDetail(id: number) {
    console.log("id",id)
  this.router.navigate(['/product',id]);
}
}
  