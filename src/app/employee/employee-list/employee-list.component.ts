import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/shared/models/employee.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employeeList: any = [];
  public files: any;
  public imgUrl: string | ArrayBuffer | null = "";
  public departmentList: any = [];
  public roleList: any = [];
  public empForm !: FormGroup;
  empObj = new EmployeeModel();
  currentEmpId: number = 0;
  isEdit: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private deptService: DepartmentService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      FirstName: [''],
      LastName: [''],
      Address: [''],
      Mobile: [''],
      DepartmentId: [''],
      Designation: [''],
      Email: [''],
      Password: [''],
      RoleId: [''],
      ProfileImageUrl: [''],
      StartDate: ['']
    });

    this.getAllEmployees(); // calling the method defined below
    this.getDepartment();
    this.getRoles();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.employeeList = res.Result;
          this.employeeList.forEach((a: any) => {
            a.ProfileImageUrl = "https://localhost:44314/" + a.ProfileImageUrl
          })

        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getDepartment() {
    this.deptService.getAllDepartments()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.departmentList = res.Result;
        }
      })
  }

  getRoles() {
    this.roleService.getAllRoles()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.roleList = res.Result;
        }
      })
  }

  loadProfileImage(event: any) {
    console.log(event);
    console.log(event.target);
    console.log(event.target.files[0]);
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      alert("You must select an Image!!!");
      return
    }
    let fileType = event?.target.files[0].type;
    if (fileType.match(/image\/*/) == null) {
      alert("Only Images are supported");
      return;
    }
    if (event.target.files[0].size > 100000) {
      alert(`Max Size is 30 KB`);
      return;
    }
    this.files = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    }

  }

  onAdd() {
    this.isEdit = false;
    this.empForm.reset();
    this.imgUrl = '';
  }

  addEmployee() {
    this.empObj.FirstName = this.empForm.value.FirstName;
    this.empObj.LastName = this.empForm.value.LastName;
    this.empObj.Address = this.empForm.value.Address;
    this.empObj.RoleId = this.empForm.value.RoleId;
    this.empObj.DepartmentId = this.empForm.value.DepartmentId;
    this.empObj.Designation = this.empForm.value.Designation;
    this.empObj.StartDate = this.empForm.value.StartDate;
    this.empObj.Email = this.empForm.value.Email;
    this.empObj.Mobile = this.empForm.value.Mobile;
    this.empObj.Password = this.empForm.value.Password;

    let formData = new FormData();
    formData.append("EmployeeDetails", JSON.stringify(this.empObj)); // convert empObj to string
    formData.append("EmployeeImage", this.files) // line 99
    this.employeeService.addEmployee(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getAllEmployees();
          this.empForm.reset();
          document.getElementById("close-emp")?.click(); // Javascript. Check the id="close-emp" in the html and click the button
        },
        error: (err) => {
          console.log(err);
        }
      })

  }

  onEditEmployee(row: any) {
    this.isEdit = true;
    console.log(row);
    this.currentEmpId = row.Id;                                     //It assigns the Id property from the row object to the currentEmpId property. This might be used to track which employee is currently being edited.
    this.empForm.controls['FirstName'].setValue(row.FirstName);     //Sets the value of the 'FirstName' field in the form to the FirstName property of the row object.
    this.empForm.controls['LastName'].setValue(row.LastName);
    this.empForm.controls['Address'].setValue(row.Address);
    this.empForm.controls['RoleId'].setValue(row.RoleId);
    this.empForm.controls['DepartmentId'].setValue(row.DepartmentId);
    this.empForm.controls['Designation'].setValue(row.Designation);
    this.empForm.controls['StartDate'].setValue(row.StartDate);
    this.empForm.controls['Email'].setValue(row.Email);
    this.empForm.controls['Mobile'].setValue(row.Mobile);
    this.empForm.controls['Password'].setValue(row.Password);
    
    // Preload ProfileImageUrl
    if (row.ProfileImageUrl) {
      this.imgUrl = row.ProfileImageUrl;
    } else {
      // Set a default image or clear the current image if no ProfileImageUrl is available.
      this.imgUrl = ''; // You can set a default image URL or an empty string here.
    }

  }

  updateEmployee() {
    this.empObj.Id = this.currentEmpId;
    this.empObj.FirstName = this.empForm.value.FirstName;
    this.empObj.LastName = this.empForm.value.LastName;
    this.empObj.Address = this.empForm.value.Address;
    this.empObj.RoleId = this.empForm.value.RoleId;
    this.empObj.DepartmentId = this.empForm.value.DepartmentId;
    this.empObj.Designation = this.empForm.value.Designation;
    this.empObj.StartDate = this.empForm.value.StartDate;
    this.empObj.Email = this.empForm.value.Email;
    this.empObj.Mobile = this.empForm.value.Mobile;
    this.empObj.Password = this.empForm.value.Password;

    let formData = new FormData();
    formData.append("EmployeeDetails", JSON.stringify(this.empObj)); // convert empObj to string
    formData.append("EmployeeImage", this.files) 
    this.employeeService.updateEmployee(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getAllEmployees();
          this.empForm.reset();
          document.getElementById("close-emp")?.click(); // Javascript. Check the id="close-emp" in the html and click the button
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  removeEmployee(id:number) {
    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getAllEmployees();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  seeDetails(id: any) {
    this.router.navigate(['employee/employee-detail/', id])
  }
}
