import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.scss'],
})
export class EmpEditComponent {
  employeeId: any;
  employee: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = +params['id'];
      this.loadEmployeeDetails();
    });
  }

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

  updateEmployee(): void {
    if (this.employeeId) {
      this.employeeService
        .updateEmployee(this.employeeId, this.employee)
        .subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Employee details updated successfully.',
            }).then(() => {
              // Navigate back to employee details page
              this.router.navigate(['/emp-details']);

              // reloading the component or fetching fresh data
              this.loadEmployeeDetails();
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error updating employee details. Please try again.',
            });
            console.error('Error updating employee details:', error);
          }
        );
    }
  }
  goBack(): void {
    this.router.navigate(['/emp-details']); 
  }
}
