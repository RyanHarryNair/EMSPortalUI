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

  addRole(formData: any) {
    return this.http.post<any>(`${this.baseApiUrl}add`, formData);
  }

  updateRole(roleObj: any) {
    return this.http.put<any>(`${this.baseApiUrl}update`, roleObj);
  }

  deleteRole(id: number) {
    return this.http.delete<any>(`${this.baseApiUrl}${id}`);
  }
}
