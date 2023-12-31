import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Service properties
  private apiUrl = 'http://localhost:3000/employees';
  private loggedInEmployeeId: number | null = null;
  private refreshListSubject = new Subject<void>();

  // Constructor with dependency injection
  constructor(private http: HttpClient) { }
  // Method to get all employees
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Method to get details of a specific employee
  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<any>(url);
  }
  // Method to add a new employee,employee is model name
  addEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }
  // Method to update an existing employee
  updateEmployee(employeeId: number, employee: any): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.put(url, employee);
  }
  // Method to delete an employee
  deleteEmployee(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.delete(url);
  }

  // Method to notify subscribers to refresh the employee list
  notifyRefreshList(): void {
    this.refreshListSubject.next();
  }
  
}
