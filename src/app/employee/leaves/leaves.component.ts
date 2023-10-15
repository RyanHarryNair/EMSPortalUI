import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveModel } from 'src/app/shared/models/leave.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LeaveService } from 'src/app/shared/services/leave.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnInit {

  public leaveList: any = [];
  public leaveForm !: FormGroup;
  leaveObj = new LeaveModel();
  currentLeaveId: number = 0;
  isEdit: boolean = false;
  startDate: any = ''; 

  constructor(private leaveService: LeaveService, private formBuilder: FormBuilder, private auth: AuthService,){}

  ngOnInit(): void {
    this.leaveForm = this.formBuilder.group({
      UserId: [''],
      UserName: [''],
      LStartDate: [''],
      LEndDate: [''],
      Count: [''],
      LeaveType: [''],
      Status: [''],
    })

    this.getAllLeaves();
  }

  getAllLeaves() {
    this.leaveService.getAllLeaves()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.leaveList = res.Result;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }


  onEditLeave(row: any) {
    this.isEdit = true;
    console.log(row);
    this.currentLeaveId = row.LeaveId;
    this.leaveForm.controls['UserId'].setValue(row.UserId);
    this.leaveForm.controls['UserName'].setValue(row.UserName);
    this.leaveForm.controls['LStartDate'].setValue(new Date(row.LStartDate).toISOString().split('T')[0]); // Parse the ISO date string to a javascript 'Date' object // Format the date as 'yyyy-MM-dd' (or any desired format)
    this.leaveForm.controls['LEndDate'].setValue(new Date(row.LEndDate).toISOString().split('T')[0]);
    this.leaveForm.controls['Count'].setValue(row.Count);
    this.leaveForm.controls['LeaveType'].setValue(row.LeaveType);
    this.leaveForm.controls['Status'].setValue(row.Status);
  }

  updateLeave() {
    this.leaveObj.LeaveId = this.currentLeaveId;
    this.leaveObj.UserId = this.leaveForm.value.UserId;
    this.leaveObj.UserName = this.leaveForm.value.UserName;
    this.leaveObj.LStartDate = this.leaveForm.value.LStartDate;
    this.leaveObj.LEndDate = this.leaveForm.value.LEndDate;
    this.leaveObj.Count = this.leaveForm.value.Count;
    this.leaveObj.LeaveType = this.leaveForm.value.LeaveType;
    this.leaveObj.Status = this.leaveForm.value.Status;

    let formData = new FormData();
    formData.append("LeaveDetails", JSON.stringify(this.leaveObj));
    this.leaveService.updateLeave(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getAllLeaves();
          this.leaveForm.reset();
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

  } */

}
