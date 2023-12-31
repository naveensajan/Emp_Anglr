import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { LeaveService } from '../services/leave.service';


@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.scss']
})
export class LeaveApplicationComponent{
  employees: any[] = []; // Array to store employee data
  location: any;// Variable to store location data
 
  // Constructor that injects necessary services
  constructor(private router: Router, private employeeService: EmployeeService, private leaveService: LeaveService ) {}
 
  // Lifecycle hook called after the component is initialized
  ngOnInit(): void {
    this.loadEmployees();  // Load employees and their leave details when the component is initialized
  }
 
  // Method to fetch employees and their leave details
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
       // Successful response callback
      (data) => {
        this.employees = data;

        // Fetch and attach leave details for each employee
        this.employees.forEach(employee => {
          this.leaveService.getEmployeeLeaveRequests(employee.id).subscribe(
              // Successful response callback
            (leaveDetails) => {
              employee.leaveDetails = leaveDetails;
            },
             // Error callback
            (error) => {
              console.error(`Error fetching leave details for employee ${employee.id}:`, error);
            }
          );
        });
      },
       // Error callback
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
   // Method to navigate back to the HR dashboard
    goBack(): void {
      this.router.navigate(['/hr-dashboard']);
    }
}
