import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Constructor to inject AuthService and Router dependencies
  constructor(private authService: AuthService, private router: Router) { }

  // Implementation of CanActivate interface method
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user is logged in using the AuthService
    if (this.authService.isLoggedIn()) {
      // User is authenticated, allow access to the requested route
      return true;
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['/login']);
      // Return false to prevent access to the requested route
      return false;
    }
  }
}
