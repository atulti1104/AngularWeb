import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(`${this.API}/signup`, data);
  }
  sendOtp(email: string) {
  return this.http.post('http://localhost:3000/api/auth/send-otp', { email });
}

verifyOtp(email: string, otp: string) {
  return this.http.post('http://localhost:3000/api/auth/verify-otp', { email, otp });
}

}
   