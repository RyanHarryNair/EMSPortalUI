import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseApiUrl: string = "https://localhost:44314/Employee/"
  constructor(private http: HttpClient) { }

  addEmployee(formData: any) {
    return this.http.post<any>(`${this.baseApiUrl}add`, formData);
  }
  
  getAllEmployees() {
    return this.http.get<any>(this.baseApiUrl);
}

  updateEmployee(empObj: any) {
    return this.http.put<any>(`${this.baseApiUrl}update`, empObj);
}

  deleteEmployee(id: number) {
    return this.http.delete<any>(`${this.baseApiUrl}${id}`) //(this.baseApiUrl + id)
  }
    
getEmployeebyId(id: number){
  return this.http.get<any>(this.baseApiUrl + id);  // (`${this.baseApiUrl}${id}`)
  }
}