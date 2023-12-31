import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  // Service property
  private apiUrl = 'http://localhost:3000/leaveRequests';

  // Constructor with dependency injection
  constructor(private http: HttpClient) { }

  // Method to apply for leave
  applyLeave(employeeId: number, leaveDetails: any): Observable<any> {
    const url = `${this.apiUrl}`;
    const leaveRequest = { employeeId, ...leaveDetails, status: 'pending' };
    return this.http.post(url, leaveRequest);
  }
  // Method to get leave requests for a specific employee
  getEmployeeLeaveRequests(employeeId: number): Observable<any[]> {
    const url = `${this.apiUrl}?employeeId=${employeeId}`;
    return this.http.get<any[]>(url);
  }

  // Method to get all leave requests
  getLeaveRequests(): Observable<any[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<any[]>(url);
  }

}