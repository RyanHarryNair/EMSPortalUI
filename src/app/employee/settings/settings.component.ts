import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleModel } from 'src/app/shared/models/role.model';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public roleList: any = [];
  public roleForm !: FormGroup
  roleObj = new RoleModel();
  currentRoleId: number = 0;
  isEdit: boolean = false;

  constructor(
    private roleService: RoleService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      RoleName: [''],
      Description: [''],
    })

    this.getRole();
  }

  getRole() {
    this.roleService.getAllRoles()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.roleList = res.Result;
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  onAddRole() {
    this.isEdit = false;
    this.roleForm.reset();
  }

  addRole() {
    this.roleObj.RoleName = this.roleForm.value.RoleName;
    this.roleObj.Description = this.roleForm.value.Description;

    let formData = new FormData();
    formData.append("RoleDetails", JSON.stringify(this.roleObj));

    this.roleService.addRole(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getRole();
          this.roleForm.reset();
          document.getElementById("close-role")?.click();
        },
        error: (err) => {
          console.log(err);
        }
    })
  }

  onEditRole(row: any) {
    this.isEdit = true;
    console.log(row);
    this.currentRoleId = row.RoleId;       
    this.roleForm.controls['RoleName'].setValue(row.RoleName);
    this.roleForm.controls['Description'].setValue(row.Description)
}

  updateRole() {
    this.roleObj.RoleId = this.currentRoleId;
    this.roleObj.RoleName = this.roleForm.value.RoleName;
    this.roleObj.Description = this.roleForm.value.Description;

    let formData = new FormData();
    formData.append("RoleDetails", JSON.stringify(this.roleObj));

    this.roleService.updateRole(formData)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getRole();
          this.roleForm.reset();
          document.getElementById("close-role")?.click();
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  removeRole(id: number) {
    this.roleService.deleteRole(id)
      .subscribe({
        next: (res) => {
          alert(res.Message);
          this.getRole();
        },
        error: (err) => {
          console.log(err);
        }
    })
  }

}
