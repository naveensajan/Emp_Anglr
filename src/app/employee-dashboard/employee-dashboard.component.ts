import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { OnlineStatusService } from '../services/online-status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  loggedInEmployeeId: string | null;
  loggedInEmployee: any;
  isOnline: boolean = true;
  @Input() bg: string = '';

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private onlineStatusService: OnlineStatusService,
    private router: Router
  ) {
    this.loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
  }

  ngOnInit(): void {
    this.loadLoggedInEmployeeDetails();
  }

  loadLoggedInEmployeeDetails(): void {
    if (this.loggedInEmployeeId) {
      this.employeeService
        .getEmployeeDetails(+this.loggedInEmployeeId)
        .subscribe((data) => {
          this.loggedInEmployee = data;
        });
    }
  }

  markOnline(): void {
    this.isOnline = true;
    this.saveOnlineStatus(true);
    alert('Status set online');
  }

  markOffline(): void {
    this.isOnline = false;
    this.saveOnlineStatus(false);
    alert('Status set offline');
  }

  private saveOnlineStatus(online: boolean): void {
    if (this.loggedInEmployeeId) {
      this.onlineStatusService
        .updateOnlineStatus(+this.loggedInEmployeeId, online)
        .subscribe(() => {
          // Reload employee details after updating status
          this.loadLoggedInEmployeeDetails();
        });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
