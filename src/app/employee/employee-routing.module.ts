import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { DepartmentComponent } from './department/department.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LeavesComponent } from './leaves/leaves.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: "", component: EmployeeComponent,
    children: [
      // { path: '', redirectTo:'admin-dashboard', pathMatch:'full' },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'departments', component: DepartmentComponent },
      { path: 'employee-detail/:id', component: EmployeeDetailComponent }, /* specify id (i.e 1, 2,3, etc) by the end when u paste the address in the adrress bar */
      { path: 'employee-leaves', component: EmployeeLeavesComponent },
      { path: 'employee-list', component: EmployeeListComponent },
      { path: 'leaves', component: LeavesComponent },
      { path: 'settings', component: SettingsComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
