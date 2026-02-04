import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // ===== FORM FIELDS =====
  identifier: string = ''; // email OR username
  password: string = '';
  captchaInput: string = '';

  // ===== CAPTCHA =====
  captcha: string = '';

  // ===== UI STATE =====
  errorMessage: string = '';
  loading: boolean = false;
  loginSuccess: boolean = false;

  // ===== API =====
  private API_URL = 'http://localhost:3000/api/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  // 🔐 captcha generator
  generateCaptcha() {
    this.captcha = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();
  }

  // 🚀 LOGIN
  login() {
    this.errorMessage = '';

    if (!this.identifier || !this.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.captchaInput !== this.captcha) {
      this.errorMessage = 'Invalid captcha';
      this.generateCaptcha();
      return;
    }

    this.loading = true;

    this.http.post<any>(this.API_URL, {
      identifier: this.identifier,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.loading = false;

        // 🔐 store login state (basic)
        window.localStorage.setItem('isLoggedIn', 'true');
        window.localStorage.setItem('user', JSON.stringify(res.user));

        // 🔥 redirect to search page
        this.router.navigate(['/search']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err.error?.message || 'Login failed';
        this.generateCaptcha();
      }
    });
  }


}
