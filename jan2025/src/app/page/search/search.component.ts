import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../cart.service';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  

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




  
     cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  
  showPopup = false;
  selectedItem: any = null;

  // dummy products (image baad me aap add kar lena)
  products = [
    {
      id: 1,
      name: 'Handmade Item',
      price: 499,
      desc: 'This is a beautiful handmade product.'
    },
    {
      id: 2,
      name: 'Craft Product',
      price: 799,
      desc: 'Premium craft product with best quality.'
    }
  ];

  // image click
  openPopup(item: any) {
    this.selectedItem = item;
    this.showPopup = true;
  }

  // close popup
  closePopup() {
    this.showPopup = false;
    this.selectedItem = null;
  }

  // add to cart (abhi sirf demo)
  addToCart() {
    alert(this.selectedItem.name + ' added to cart');
    this.closePopup();
  }
}
