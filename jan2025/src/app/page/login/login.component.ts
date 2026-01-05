import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameOrEmail = '';
  password = '';
  captchaInput = '';

  generatedCaptcha = '';
  errorMessage = '';

  ngOnInit() {
    this.generateCaptcha();
  }

  // 🔐 Simple captcha generator
  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    this.generatedCaptcha = '';
    for (let i = 0; i < 5; i++) {
      this.generatedCaptcha += chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }
  }

  login() {
    // ❌ captcha mismatch
    if (this.captchaInput !== this.generatedCaptcha) {
      this.errorMessage = 'Invalid captcha. Please try again.';
      this.generateCaptcha();
      return;
    }

    // 🔴 demo validation (replace with backend later)
    if (
      this.usernameOrEmail === 'admin@gmail.com' &&
      this.password === '123456'
    ) {
      this.errorMessage = '';
      alert('Login Successful ✅');
      // future: router.navigate(['/']);
    } else {
      this.errorMessage = 'User not registered. Please sign up first.';
    }
  }
}
