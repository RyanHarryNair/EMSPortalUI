import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  public baseApiUrl: string = "https://localhost:44314/Department/"
  constructor(private http: HttpClient) { }

  getAllDepartments() {
    return this.http.get<any>(this.baseApiUrl)
  }

  addDepartment(formData: any) {
    return this.http.post<any>(`${this.baseApiUrl}add`, formData);
  }

  updateDepartment(deptObj: any) {
    return this.http.put<any>(`${this.baseApiUrl}update`, deptObj);
  }

  deleteDepartment(id: number) {
    return this.http.delete<any>(`${this.baseApiUrl}${id}`);
  }
}
