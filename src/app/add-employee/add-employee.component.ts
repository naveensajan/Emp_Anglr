import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
// Data model for the employee being added
  employee: any = {
    name: '',
    email: '',
    phone: '',
    age: null,
    dob: null,
    image: '',
    bloodGroup: '',
    gender: '',
    leaveDetails: '',
    designation: '',
  };
// Constructor with injected services
  constructor(
    private employeeService: EmployeeService,
    private location: Location,
    private router: Router
  ) {}

 // Method triggered when the form is submitted
  onSubmit(): void {
      // Call the EmployeeService to add the employee
    this.employeeService.addEmployee(this.employee).subscribe(
      () => {
        // Display a success message using SweetAlert2 library
        Swal.fire({
          title: 'Success!',
          text: 'Employee added successfully.',
          icon: 'success',
        });
        console.log('Employee added successfully.');
       // Navigate to the employee-details page after successful addition
        this.router.navigate(['/employee-details']);
      },
      (error) => {
         // Display an error message using SweetAlert2 library
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while adding the employee.',
          icon: 'error',
        });
        console.error('Error adding employee:', error);
      }
    );
  }

// Method to navigate back to the previous location (back button functionality)
  goBack(): void {
    this.location.back();
  }
}
