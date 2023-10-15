import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})

export class EmployeeDetailComponent implements OnInit {

  empId !: number;        // Store the employee ID
  empData!: EmployeeModel; // Store the employee data

  // Constructor to inject dependencies
  constructor(private activatedRoute: ActivatedRoute, private empService: EmployeeService) { }

  // Lifecycle hook: ngAfterViewInit : This method is called after the view is initialized
  ngAfterViewInit(): void {
    this.getEmployee();
  }

  // Lifecycle hook: ngOnInit : This method is called when the component is initialized
  ngOnInit(): void {
    // Subscribe to changes in route parameters
    this.activatedRoute.params.subscribe(val => {
      this.empId = val['id'];                                                                            // Update the empId property with the new 'id' route parameter value
      console.log(this.empId);
    })
  }

  // Fetch employee data using the EmployeeService
  getEmployee() {
    this.empService.getEmployeebyId(Number(this.empId))
      .subscribe((res: any) => {
        this.empData = res.Result;                                                                      // Update empData with the fetched employee data
        this.empData.ProfileImageUrl = `https://localhost:44314/${this.empData.ProfileImageUrl}`        // Construct a profile image URL based on the data
        console.log(this.empData);
      })
  }
}



