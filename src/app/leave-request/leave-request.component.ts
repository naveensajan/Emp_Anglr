import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../services/leave.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit {
  // Form group for leave request details
  leaveForm: FormGroup;
  employeeId: any; // Employee ID (set based on the logged-in employee)
  leaveRequests: any[] = [];  // Array to store leave requests
 // Constructor that injects necessary services and sets up the form
  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router:Router
  ) {
     // Initialize the leaveForm with form controls and validators
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      leaveType: ['', Validators.required],
    });
  }
 // Lifecycle hook called after the component is initialized
  ngOnInit(): void {
    // Get the logged-in employee ID and load leave requests
    const loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
    if (loggedInEmployeeId !== null) {
      this.employeeId = loggedInEmployeeId;
      this.loadLeaveRequests();
    } else {
      console.error('Unable to retrieve logged-in employee ID');
    }
  }
 // Method to submit a leave application
  applyLeave() {
    if (this.leaveForm.valid) {
       // Get leave details from the form
      const leaveDetails = this.leaveForm.value;
      // Call the leave service to apply leave
      this.leaveService.applyLeave(this.employeeId, leaveDetails).subscribe(
        // Success callback
        () => {
          this.loadLeaveRequests();// Refresh leave requests
          this.leaveForm.reset();// Reset the form
        },
         // Error callback
        error => {
          console.error('Error applying leave:', error);
          // Handle error (e.g., show an alert to the user)
        }
      );
    }
  }
  // Method to load leave requests
  loadLeaveRequests(leaveRequestId?: number) {
    this.leaveService.getEmployeeLeaveRequests(this.employeeId).subscribe(
      leaveRequests => {
         // Filter and display only the selected leave request if specified
        if (leaveRequestId !== undefined) {
          // Find the leave request with the specified ID
          const selectedRequest = leaveRequests.find(request => request.id === leaveRequestId);
  
          // Display feedback status only for the selected leave request
          this.leaveRequests = selectedRequest ? [selectedRequest] : [];
        } else {
          // Display all leave requests
          this.leaveRequests = leaveRequests;
        }
      },
       // Error callback
      error => {
        console.error('Error fetching leave requests:', error);
        // Handle error (e.g., show an alert to the user)
      }
    );
  }
// Method to navigate back to the employee dashboard
  goBack(): void {
    this.router.navigate(['/employee-dashboard']); 
  }
// Method to check if the leave status is available for display
  isStatusAvailable(leaveRequest: any): boolean {
    return leaveRequest.status === 'approved' || leaveRequest.status === 'rejected';
  }
}
