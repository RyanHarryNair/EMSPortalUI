import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveModel } from 'src/app/shared/models/leave.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LeaveService } from 'src/app/shared/services/leave.service';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.scss']
})
export class EmployeeLeavesComponent implements OnInit {
  public employeeleaveList: any = [];
  public employeeleaveForm !: FormGroup;
  employeeleaveObj = new LeaveModel();
  currentEmployeeLeaveId: number = 0;
  isEdit: boolean = false;
  currentUser: number = 0;

  constructor(private leaveService: LeaveService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.employeeleaveForm = this.formBuilder.group({
      LStartDate: [''],
      LEndDate: [''],
      Count: [''],
      LeaveType: [''],
    })

    this.getAllLeaves();
  }

  getAllLeaves() {
    this.leaveService.getAllLeaves()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.employeeleaveList = res.Result;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

    onAdd() {
    this.employeeleaveForm.reset();
    }
  


  addLeave() {
    this.employeeleaveObj.LStartDate = this.employeeleaveForm.value.LStartDate;
    this.employeeleaveObj.LEndDate = this.employeeleaveForm.value.LEndDate;
    this.employeeleaveObj.Count = this.employeeleaveForm.value.Count;
    this.employeeleaveObj.LeaveType = this.employeeleaveForm.value.LeaveType;
    this.employeeleaveObj.UserId = Number(this.auth.getUserId());

    this.employeeleaveObj.CreatedBy = Number(this.auth.getRoleId());
    this.employeeleaveObj.CreateDate = new Date();

    let formData = new FormData();
    formData.append("LeaveDetails", JSON.stringify(this.employeeleaveObj));
    this.leaveService.addLeave(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getAllLeaves();
          this.employeeleaveForm.reset();
          document.getElementById("close-empleave")?.click();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onEditLeave(row: any) {
    this.isEdit = true;
    console.log(row);
    this.currentEmployeeLeaveId = row.LeaveId;
    this.employeeleaveForm.controls['LStartDate'].setValue(row.LStartDate);
    this.employeeleaveForm.controls['LEndDate'].setValue(row.LEndDate);
    this.employeeleaveForm.controls['Count'].setValue(row.Count);
    this.employeeleaveForm.controls['LeaveType'].setValue(row.LeaveType);
  }

  updateLeave() {
    this.employeeleaveObj.LeaveId = this.currentEmployeeLeaveId;
    this.employeeleaveObj.LStartDate = this.employeeleaveForm.value.LStartDate;
    this.employeeleaveObj.LEndDate = this.employeeleaveForm.value.LEndDate;
    this.employeeleaveObj.Count = this.employeeleaveForm.value.Count;
    this.employeeleaveObj.LeaveType = this.employeeleaveForm.value.LeaveType;

    let formData = new FormData();
    formData.append("LeaveDetails", JSON.stringify(this.employeeleaveObj));
    this.leaveService.updateLeave(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getAllLeaves();
          this.employeeleaveForm.reset();
          document.getElementById("close-leave")?.click();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

/*   removeLeave(UserId: number) {
    this.leaveService.deleteLeave(UserId)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getAllLeaves();
        },
        error: (err) => {
          console.log(err);
        }
      })

  }
 */
}
