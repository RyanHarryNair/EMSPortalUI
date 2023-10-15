import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  public baseApiUrl: string = "https://localhost:44314/Leave/"
  constructor(private http: HttpClient) { }

  getAllLeaves() {
    return this.http.get<any>(this.baseApiUrl)
  }

  addLeave(formData: any) {
    return this.http.post<any>(`${this.baseApiUrl}add`, formData);
  }

  updateLeave(leaveObj: any) {
    return this.http.put<any>(`${this.baseApiUrl}update`, leaveObj);
  }

  deleteLeave(userId: number) {
    return this.http.delete<any>(`${this.baseApiUrl}${userId}`);
  }
}
