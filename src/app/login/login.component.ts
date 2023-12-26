// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loading: boolean = false; // Add loading property

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
   
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          if (this.authService.getRole() === 'hr') {
            this.router.navigate(['/hr-dashboard']);
          } else {
            this.router.navigate(['/employee-dashboard']);
          }

          // Display success alert using SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You are now logged in.',
            timer: 1000,  // Automatically close after 1 seconds
            showConfirmButton: false
          });
        } else {
          console.error('Invalid credentials. Authentication failed.');

          // Display error alert using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid credentials. Please try again.'
          });
        }
      },
      error => {
        console.error('Error during login:', error);

        // Display error alert using SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred during login. Please try again later.'
        });
      },
     
    );
  }
}
