// leave-request.component.ts

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
  
  leaveForm: FormGroup;
  employeeId: any; // This will be set based on the logged-in employee
  leaveRequests: any[] = [];

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      leaveType: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
    if (loggedInEmployeeId !== null) {
      this.employeeId = loggedInEmployeeId;
      this.loadLeaveRequests();
    } else {
      console.error('Unable to retrieve logged-in employee ID');
    }
  }

  applyLeave() {
    if (this.leaveForm.valid) {
      const leaveDetails = this.leaveForm.value;
      this.leaveService.applyLeave(this.employeeId, leaveDetails).subscribe(
        () => {
          this.loadLeaveRequests();
          this.leaveForm.reset();
        },
        error => {
          console.error('Error applying leave:', error);
          // Handle error (e.g., show an alert to the user)
        }
      );
    }
  }

  loadLeaveRequests(leaveRequestId?: number) {
    this.leaveService.getEmployeeLeaveRequests(this.employeeId).subscribe(
      leaveRequests => {
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
      error => {
        console.error('Error fetching leave requests:', error);
        // Handle error (e.g., show an alert to the user)
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/employee-dashboard']); // Adjust the route accordingly
  }

  isStatusAvailable(leaveRequest: any): boolean {
    return leaveRequest.status === 'approved' || leaveRequest.status === 'rejected';
  }
}
