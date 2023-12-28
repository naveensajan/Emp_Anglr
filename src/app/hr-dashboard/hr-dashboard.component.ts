import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent {
// Constructor that injects necessary services
  constructor(private router: Router,private authService:AuthService){}
// Method to handle the logout functionality
  logout(){
    // Call the logout method from the AuthService
    this.authService.logout();
     // Navigate to the login page after successful logout
    this.router.navigate(['/login']);
  }
}
