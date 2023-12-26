import { Component } from '@angular/core';
import { HrLeaveService } from '../services/hr-leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hr-leave',
  templateUrl: './hr-leave.component.html',
  styleUrls: ['./hr-leave.component.scss']
})
export class HrLeaveComponent {
  pendingLeaveRequests: any[] = [];

  constructor(private hrLeaveService: HrLeaveService) {
    this.fetchPendingLeaveRequests();
  }

  fetchPendingLeaveRequests(): void {
    this.hrLeaveService.getPendingLeaveRequests().subscribe(requests => {
      this.pendingLeaveRequests = requests;
    });
  }

  approveLeave(leaveRequestId: number): void {
    this.hrLeaveService.approveLeave(leaveRequestId).subscribe(() => {
      // After approving leave, fetch updated pending leave requests
      this.fetchPendingLeaveRequests();
      // Show success alert
      this.showSuccessAlert('Leave request approved successfully.');
    });
  }

  rejectLeave(leaveRequestId: number): void {
    this.hrLeaveService.rejectLeave(leaveRequestId).subscribe(() => {
      // After rejecting leave, fetch updated pending leave requests
      this.fetchPendingLeaveRequests();
      // Show success alert
      this.showErrorAlert('Leave request rejected.');
    });
  }

  private showSuccessAlert(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  private showErrorAlert(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Rejected!',
      text: message,
    });
  }
}
