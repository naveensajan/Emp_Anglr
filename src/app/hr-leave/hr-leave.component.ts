import { Component } from '@angular/core';
import { HrLeaveService } from '../services/hr-leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hr-leave',
  templateUrl: './hr-leave.component.html',
  styleUrls: ['./hr-leave.component.scss']
})
export class HrLeaveComponent {
   // Array to store pending leave requests
  pendingLeaveRequests: any[] = [];
 
  // Constructor that injects necessary services and fetches pending leave requests on component initialization
   constructor(private hrLeaveService: HrLeaveService) {
    this.fetchPendingLeaveRequests();
  }
  
 // Method to fetch pending leave requests from the service
  fetchPendingLeaveRequests(): void {
    this.hrLeaveService.getPendingLeaveRequests().subscribe(requests => {
      this.pendingLeaveRequests = requests;
    });
  }

// Method to approve a leave request
  approveLeave(leaveRequestId: number): void {
    this.hrLeaveService.approveLeave(leaveRequestId).subscribe(() => {
      // After approving leave, fetch updated pending leave requests
      this.fetchPendingLeaveRequests();
      // Show success alert
      this.showSuccessAlert('Leave request approved successfully.');
    });
  }
 // Method to reject a leave request
  rejectLeave(leaveRequestId: number): void {
    this.hrLeaveService.rejectLeave(leaveRequestId).subscribe(() => {
      // After rejecting leave, fetch updated pending leave requests
      this.fetchPendingLeaveRequests();
      // Show success alert
      this.showErrorAlert('Leave request rejected.');
    });
  }
// Private method to show a success alert using SweetAlert2
  private showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }
//error alert
  private showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Rejected!',
      text: message,
    });
  }
}
