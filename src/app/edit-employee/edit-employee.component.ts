import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employeeId: any;
  employee: any = {};

 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private location: Location
  ) { }
  // employee id fetch
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = +params['id'];
      this.loadEmployeeDetails();
    });
  }
  // load the employee details
  loadEmployeeDetails(): void {
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }
  // update employee details
  updateEmployee(): void {
    this.employeeService
      .updateEmployee(this.employeeId, this.employee)
      .subscribe(
        () => {
          Swal.fire({
            title: 'Success!',
            text: 'Employee details updated successfully.',
            icon: 'success',
          });
          this.router.navigate(['/employee-details']);
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the employee details.',
            icon: 'error',
          });
        }
      );
  }

  goBack(): void {
    this.location.back();
  }
}
