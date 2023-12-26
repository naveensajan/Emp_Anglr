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

  constructor(
    private employeeService: EmployeeService,
    private location: Location,
    private router: Router
  ) {}


  onSubmit(): void {
    this.employeeService.addEmployee(this.employee).subscribe(
      () => {
        Swal.fire({
          title: 'Success!',
          text: 'Employee added successfully.',
          icon: 'success',
        });
        console.log('Employee added successfully.');
       
        this.router.navigate(['/employee-details']);
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while adding the employee.',
          icon: 'error',
        });
        console.error('Error adding employee:', error);
      }
    );
  }


  goBack(): void {
    this.location.back();
  }
}
