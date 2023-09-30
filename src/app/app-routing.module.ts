import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeComponent } from './employee/employee.component';
import { AdminDashboardComponent } from './employee/admin-dashboard/admin-dashboard.component';
import { DepartmentComponent } from './employee/department/department.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { LeavesComponent } from './employee/leaves/leaves.component';
import { SettingsComponent } from './employee/settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  { path: 'login', loadChildren: () => import('./login/login.module').then(a => a.LoginModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(a => a.EmployeeModule), canActivate: [authGuard] },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(a => a.SignupModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
