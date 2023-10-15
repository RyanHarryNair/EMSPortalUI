import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentModel } from 'src/app/shared/models/department.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DepartmentService } from 'src/app/shared/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  public departmentList: any = [];
  public deptForm !: FormGroup
  deptObj = new DepartmentModel();
  currentDeptId: number = 0;
  isEdit: boolean = false;

  constructor(
    private deptService: DepartmentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.deptForm = this.formBuilder.group({
      DeptName: [''],
    })

    this.getDepartment();
  }

  getDepartment() {
    this.deptService.getAllDepartments()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.departmentList = res.Result;
        },
        error: (err) => {
          console.log(err)
        }

      })
  }

  onAdd() {
    this.isEdit = false;
    this.deptForm.reset();
  }

  addDepartment() {
    this.deptObj.DeptName = this.deptForm.value.DeptName;
    this.deptObj.CreatedBy = Number(this.auth.getRoleId());   
    this.deptObj.CreateDate = new Date();

    let formData = new FormData();
    formData.append("DepartmentDetails", JSON.stringify(this.deptObj));
    this.deptService.addDepartment(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getDepartment();
          this.deptForm.reset();
          document.getElementById("close-dept")?.click();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onEditDepartment(row: any) {
    this.isEdit = true;
    console.log(row);
    this.currentDeptId = row.DeptId;
    this.deptForm.controls['DeptName'].setValue(row.DeptName);
  }

  updateDepartment() {
    this.deptObj.DeptId = this.currentDeptId;
    this.deptObj.DeptName = this.deptForm.value.DeptName;
    this.deptObj.UpdatedBy = Number(this.auth.getRoleId()); 
    this.deptObj.UpdateDate = new Date();


    let formData = new FormData();
    formData.append("DepartmentDetails", JSON.stringify(this.deptObj));
    this.deptService.updateDepartment(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getDepartment();
          this.deptForm.reset();
          document.getElementById("close-dept")?.click();
        },
        error: (err) => {
          console.log(err);
        }
    })
  }

  removeDepartment(DeptId: number) {
    this.deptService.deleteDepartment(DeptId)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getDepartment();
        },
        error: (err) => {
          console.log(err);
        }
    })
    
  }
  
}
