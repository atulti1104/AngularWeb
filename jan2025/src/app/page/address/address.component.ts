import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {

  address = {
    name: '',
    mobile: '',
    fullAddress: '',
    city: '',
    state: '',
    pincode: ''
  };

  private API_URL = 'http://localhost:3000/api/order/address';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  saveAddress() {
    this.http.post(this.API_URL, this.address).subscribe({
      next: () => {
        alert('Address saved successfully');
        this.router.navigate(['/payment']);
      },
      error: () => {
        alert('Failed to save address');
      }
    });
  }
}
