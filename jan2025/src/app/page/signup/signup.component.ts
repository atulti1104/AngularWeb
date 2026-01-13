import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // ===== FORM FIELDS =====
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  captchaInput: string = '';

  // ===== CAPTCHA =====
  captcha: string = '';

  // ===== UI STATE =====
  errorMessage: string = '';
  loading: boolean = false;

  // ===== BACKEND API =====
  private API_URL = 'http://localhost:3000/api/auth/signup';
successMessage: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  // 🔐 Generate captcha
  generateCaptcha() {
    this.captcha = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();
  }

  // 🚀 SIGNUP SUBMIT
  signup() {
    this.errorMessage = '';

    // ===== VALIDATIONS =====
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.captchaInput !== this.captcha) {
      this.errorMessage = 'Invalid captcha';
      this.generateCaptcha();
      return;
    }

    // ===== API PAYLOAD =====
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.loading = true;

    // ===== API CALL =====
    this.http.post<any>(this.API_URL, payload).subscribe({
      next: (res) => {
        this.loading = false;
        alert('Registration successful ✅');
        this.router.navigate(['/login']); // 🔥 redirect to login
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err.error?.message || 'Signup failed. Try again.';
      }
    });
  }
}
