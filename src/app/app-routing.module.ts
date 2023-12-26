import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { WildcardComponent } from './wildcard/wildcard.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hr-dashboard', component: HrDashboardComponent, canActivate: [AuthGuard] },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'addemployee', component: AddEmployeeComponent,canActivate: [AuthGuard] },
  { path: 'employeedetails', component: EmployeeDetailsComponent,canActivate: [AuthGuard] }, 
  { path: 'edit/:id', component: EditEmployeeComponent,canActivate: [AuthGuard] },
  { path: 'emp-details', component: EmpDetailsComponent,canActivate: [AuthGuard] },
  { path: 'edit-employee/:id', component: EmpEditComponent,canActivate: [AuthGuard] },
  { path: 'leaveapplication', component: LeaveApplicationComponent,canActivate: [AuthGuard] },
  { path: 'leave-req', component: LeaveRequestComponent,canActivate: [AuthGuard] },
  { path: 'doughnutchart', component: DoughnutChartComponent,canActivate: [AuthGuard] },
  { path: 'barchart', component: BarChartComponent,canActivate: [AuthGuard] },
  { path: '**', component: WildcardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
