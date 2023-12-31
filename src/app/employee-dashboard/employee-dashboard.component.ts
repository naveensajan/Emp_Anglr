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
  // Variables to store the logged-in employee information and online status
  loggedInEmployeeId: string | null;
  loggedInEmployee: any;
  isOnline: boolean = true;
  // Constructor with dependency injection
  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private onlineStatusService: OnlineStatusService,
    private router: Router
  ) {
    // Initialize the logged-in employee ID using the authentication service
    this.loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
  }
  // Lifecycle hook called when the component is initialized
  ngOnInit(): void {
    // Load details of the logged-in employee
    this.loadLoggedInEmployeeDetails();
  }
  // Method to fetch details of the logged-in employee
  loadLoggedInEmployeeDetails(): void {
    if (this.loggedInEmployeeId) {
      // Call the employee service to get details of the logged-in employee
      this.employeeService
        .getEmployeeDetails(+this.loggedInEmployeeId)
        .subscribe((data) => {
          // Assign fetched employee details to the component variable
          this.loggedInEmployee = data;
        });
    }
  }


  // Method to mark the employee as online
  markOnline(): void {
    this.isOnline = true;
    // Save the online status using the online status service
    this.saveOnlineStatus(true);
    // Display an alert confirming the change in status
    alert('Status set online');
  }
  // Method to mark the employee as offline
  markOffline(): void {
    this.isOnline = false;
    // Save the online status using the online status service
    this.saveOnlineStatus(false);
    // Display an alert confirming the change in status
    alert('Status set offline');
  }
  // Private method to save the online status of the logged-in employee
  private saveOnlineStatus(online: boolean): void {
    if (this.loggedInEmployeeId) {
      // Call the online status service to update the online status
      this.onlineStatusService
        .updateOnlineStatus(+this.loggedInEmployeeId, online)
        .subscribe(() => {
          // Reload employee details after updating status
          this.loadLoggedInEmployeeDetails();
        });
    }
  }
  // Method to log out the user
  logout(): void {
    // Call the authentication service to log out the user
    this.authService.logout();
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
