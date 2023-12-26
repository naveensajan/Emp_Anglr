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
  employees: any[] = [];
  location: any;

  constructor(private router: Router, private employeeService: EmployeeService, private leaveService: LeaveService ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;

        // Fetch and attach leave details for each employee
        this.employees.forEach(employee => {
          this.leaveService.getEmployeeLeaveRequests(employee.id).subscribe(
            (leaveDetails) => {
              employee.leaveDetails = leaveDetails;
            },
            (error) => {
              console.error(`Error fetching leave details for employee ${employee.id}:`, error);
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }
    // Back function
    goBack(): void {
      this.router.navigate(['/hr-dashboard']); // Adjust the route accordingly
    }
}
