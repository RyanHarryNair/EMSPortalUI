import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
    this.getLoggedinUser();
  }

  loginUser(loginObj: any) {
    return this.http.post<any>("https://localhost:44314/Auth/login", loginObj) // Swagger Address
  }

  isUserLogin(): boolean {
    return !!localStorage.getItem("token") //if token present return true
  }

  logout() {
    this.router.navigate(['/']);
    localStorage.clear();
  }

  getLoggedinUser() {
    if (this.isUserLogin()) {
      let token = this.getToken();
      let decodedJWT = JSON.parse(window.atob(token?.split('.')[1]));
      //console.log(decodedJWT);
      return decodedJWT.FullName ? decodedJWT.FullName : 'Null';
    }
  }

  getUserRole() {
    if (this.isUserLogin()) {
      let token = this.getToken();
      let decodedJWT = JSON.parse(window.atob(token?.split('.')[1]));
     //console.log(decodedJWT);
      return decodedJWT.Role ? decodedJWT.Role : 'User';
    }
  }

  getRoleId() {
    if (this.isUserLogin()) {
      let token = this.getToken();
      let decodedJWT = JSON.parse(window.atob(token?.split('.')[1]));
      console.log(decodedJWT);
      return decodedJWT.RoleID;
    }
  }

  getUserId() {
    if (this.isUserLogin()) {
      let token = this.getToken();
      let decodedJWT = JSON.parse(window.atob(token?.split('.')[1]));
      console.log(decodedJWT);
      return decodedJWT.UserID;
    }
  }

  private getToken() {
    return localStorage.getItem("token")!; // ! : return null if no token
  }
}
