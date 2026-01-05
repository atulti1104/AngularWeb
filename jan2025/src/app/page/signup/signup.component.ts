import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  captchaInput = '';

  generatedCaptcha = '';
  errorMessage = '';
  successMessage = '';

  ngOnInit() {
    this.generateCaptcha();
  }

  // 🔐 Captcha generator
  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    this.generatedCaptcha = '';
    for (let i = 0; i < 5; i++) {
      this.generatedCaptcha += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }
  }

  signup() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.captchaInput !== this.generatedCaptcha) {
      this.errorMessage = 'Invalid captcha. Please try again.';
      this.generateCaptcha();
      return;
    }

    // 🔥 Demo success (backend baad me connect hoga)
    this.successMessage = 'Registration successful. You can now login.';
    
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.captchaInput = '';
    this.generateCaptcha();
  }
  



}
