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
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  editEmployee(employeeId: number): void {
    this.router.navigate(['/edit', employeeId]);
  }

  deleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Employee deleted successfully.',
            icon: 'success'
          });
          this.employeeService.notifyRefreshList(); 
        },
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


  goBack(): void {
    this.router.navigate(['/hr-dashboard']);
  }
}
