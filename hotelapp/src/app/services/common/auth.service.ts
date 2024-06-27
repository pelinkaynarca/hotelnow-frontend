import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token) as DecodedToken;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  hasRole(role: string): boolean {
    const decodedToken = this.decodeToken();
    return decodedToken != null && decodedToken.roles.includes(role);
  }

}


