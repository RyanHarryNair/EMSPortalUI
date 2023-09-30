import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EMSPortalUI';
/* 
  constructor(private http: HttpClient, private apiService: ApiService) {

  }

  gtEmp() {
    this.http.get(`https://localhost:44314/Employee`)
      .subscribe({
        next: (res) => {
          console.log(res, `Employee Info`);
        },
        error: (err) => {
          console.log(err, `Error Message`);
        },
        complete: () => {
          console.log(`Execution is Done`);
        },
      });

  }

  gtEmpId() {
    let id = 1;
    this.http.get(`https://localhost:44314/Employee/${id}`)
      .subscribe({
        next: (res) => {
          console.log(res, `Employee Info by ID`);
        },
        error: (err) => {
          console.log(err, `Error Message`);
        },
        complete: () => {
          console.log(`Execution is Done`);
        },
      });

  }

  ptEmp() {
    let userDtoObj = {
      "Id": 0,
      "FirstName": "Myan",
      "LastName": "Nair",
      "Address": "Singapore",
      "Mobile": "234dd56",
      "DepartmentId": 1,
      "Designation": "SE",
      "Email": "hfhd@gmail.com",
      "Password": "",
      "RoleId": 1,
      "StartDate": "2023-09-04T15:41:11.094Z"
    }
    this.apiService.postService(userDtoObj)
      .subscribe({
        next: (res) => {
          console.log(res, `Employee Info Addedd`);
        },
        error: (err) => {
          console.log(err, `Error Message`);
        },
        complete: () => {
          console.log(`Execution is Done`);
        },
      });
  }


  upEmp() {
    let id = 1;
    let userDtoObj = {
      name: "Tirtho",
      salary: "3000",
      designation: "SE"
    }
    this.http.put<any>(`https://localhost:44314/Employee/update`, userDtoObj) // Need to add ID here?
      .subscribe({
        next: (res) => {
          console.log(res, `Employee Info Updated`);
        },
        error: (err) => {
          console.log(err, `Error Message`);
        },
        complete: () => {
          console.log(`Execution is Done`);
        },
      });

  }

  dltEmp() {
    let id = 1;
    this.http.delete<any>(`https://localhost:44314/Employee/${id}`)
      .subscribe({
        next: (res) => {
          console.log(res, `Employee ID ${id} deleted`);
        },
        error: (err) => {
          console.log(err, `Error Message`);
        },
        complete: () => {
          console.log(`Execution is Done`);
        },
      });
  }
 */

}
