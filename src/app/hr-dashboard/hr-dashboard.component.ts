import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent {

  constructor(private router: Router,private authService:AuthService){}

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
