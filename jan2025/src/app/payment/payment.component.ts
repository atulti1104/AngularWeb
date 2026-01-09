import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  screenshotPreview: string | null = null;
  paymentDone = false;

  // 📸 Screenshot upload handler
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.screenshotPreview = reader.result as string;
      this.paymentDone = true; // ✅ mark success
    };
    reader.readAsDataURL(file);
  }
}
