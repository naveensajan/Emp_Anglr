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
  employeeId: any;// Variable to store the ID of the employee being edited
  employee: any = {};// Variable to store the details of the employee being edited

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameters to get the employee ID from the URL
    this.route.params.subscribe((params) => {
      // Extract the employee ID from the route parameters
      this.employeeId = +params['id'];
      // Load details of the employee to be edited
      this.loadEmployeeDetails();
    });
  }
// Load details of the employee to be edited
  loadEmployeeDetails(): void {
    this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
      (data) => {
         // Assign fetched employee details to the component variable
        this.employee = data;
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }
  // Update employee details
  updateEmployee(): void {
    if (this.employeeId) {
       // Call the employee service to update the employee details
      this.employeeService
        .updateEmployee(this.employeeId, this.employee)
        .subscribe(
          () => {
            // Display success message using SweetAlert2
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
             // Display error message using SweetAlert2
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
   // Navigate back to the employee details page
  goBack(): void {
    this.router.navigate(['/emp-details']);
  }
}
