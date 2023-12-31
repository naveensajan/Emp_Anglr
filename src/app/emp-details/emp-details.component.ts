import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss']
})
export class EmpDetailsComponent implements OnInit {

  loggedInEmployeeId: string | null;// Variable to store the ID of the logged-in employee
  loggedInEmployee: any;// Variable to store details of the logged-in employee

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router 
  ) {
     // Retrieve the logged-in employee's ID from the authentication service
    this.loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
  }

  ngOnInit(): void {
     // Load details of the logged-in employee when the component initializes
    this.loadLoggedInEmployeeDetails();
  }
  // Load details of the logged-in employee from the server
  loadLoggedInEmployeeDetails(): void {
    if (this.loggedInEmployeeId) {
      // Call the employee service to fetch details of the logged-in employee
      this.employeeService
        .getEmployeeDetails(+this.loggedInEmployeeId)// Convert ID to a number
        .subscribe((data) => {
            // Assign fetched details to the component variable using string interpolation
          this.loggedInEmployee = data;
        });
    }
  }

 // Navigate back to the employee dashboard
  goBack(): void {
    this.router.navigate(['/employee-dashboard']); 
  }

}
