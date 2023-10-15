
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html', 
  styleUrls: ['./employee.component.scss'] 
})
export class EmployeeComponent implements OnInit { 

  // Define component properties
  public LoggedInUser: string = ""; // Property to store the logged-in user's name
  public status: boolean = false; // Property to track a boolean status
  currentRoleId: any = ""; // Property to store the user's role
  currentUser: any = ""; // Property to store the user's name

  // Constructor: Initialize the component and inject the AuthService
  constructor(public auth: AuthService) { }

  // Lifecycle hook: This method is executed when the component is initialized
  ngOnInit(): void {
    this.getRoleId(); // Call the getRole method to initialize the currentRole property
    this.getUser();
  }

  // Event handler for a click event
  clickEvent() {
    this.status = !this.status; // On every click, toggle the status between true and false
  }

  // Method to retrieve and set the user's role using the AuthService
  getRoleId() {
    this.currentRoleId = this.auth.getRoleId(); // Assign the user's role to the currentRole property
  }

  getUser() {
    this.currentUser = this.auth.getLoggedinUser();
  }
}
