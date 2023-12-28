import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
// Define class properties
  employees: any[] = [];// Array to store employee data 
  location: any;// Variable to store location data
// Constructor that injects necessary services
  constructor(private router: Router, private employeeService: EmployeeService, private leaveService: LeaveService ) {}
 // Lifecycle hook called after the component is initialized
  ngOnInit(): void {
    // Load employees when the component is initialized
    this.loadEmployees();
  }
// Method to fetch employees from the service
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
          // Successful response callback
      (data) => {
        this.employees = data;
      },
      // Error callback
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
// Method to navigate to the edit employee page based on id
  editEmployee(employeeId: number): void {
    this.router.navigate(['/edit', employeeId]);
  }
 // Method to delete an employee
  deleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Employee deleted successfully.',
            icon: 'success'
          });
           // Notify the service to refresh the employee list
          this.employeeService.notifyRefreshList(); 
        },
        // Error callback
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting the employee.',
            icon: 'error'
          });
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

 // Method to navigate back to the HR dashboard
  goBack(): void {
    this.router.navigate(['/hr-dashboard']);
  }
}
