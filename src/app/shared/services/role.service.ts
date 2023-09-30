import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public baseApiUrl: string = "https://localhost:44314/Role/"
  constructor(private http: HttpClient) { }

  getAllRoles() {
    return this.http.get<any>(this.baseApiUrl)
  }
}
