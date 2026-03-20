



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

  // 👇 image system
  selectedImage: string = '';
  images: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      this.router.navigate(['/search']);
      return;
    }

    const id = Number(idParam);

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;

        // MULTIPLE IMAGE SUPPORT
        if (data.images && data.images.length > 0) {
          this.images = data.images;
        } else {
          // fallback (single image → create thumbnails)
          this.images = [data.image, data.image, data.image, data.image];
        }

        this.selectedImage = this.images[0];
        this.loading = false;
      },
      error: () => this.router.navigate(['/search'])
    });
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  orderNow() {
    const cartItem = {
      ...this.product,
      quantity: this.qty
    };

    this.cartService.addToCart(cartItem);
    this.router.navigate(['/cart']);
  }
}
