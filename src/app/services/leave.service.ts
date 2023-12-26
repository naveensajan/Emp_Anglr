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
 // Method to get leave counts
  getLeaveCounts(): Observable<any[]> {
    const url = `${this.apiUrl}/leave-counts`;
    return this.http.get<any[]>(url);
  }
  // Method to get employee details
  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/employees/${employeeId}`;
    return this.http.get<any>(url);
  }
  // Method to update the online status of an employee
  updateEmployeeStatus(employeeId: number, status: { online: boolean }): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.patch(url, status);
  }
  // Method to update employee details
  updateEmployee(employeeId: number, employee: any): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.patch(url, employee);
  }
}