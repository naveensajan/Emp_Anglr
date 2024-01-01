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

  // Constructor with dependency injection
  constructor(private http: HttpClient) { }
  // Method to get all employees to list in hrdash
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Method to get details of a specific employee to show in empdash
  getEmployeeDetails(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<any>(url);
  }
  // Method to add a new employee in hrdash,employee is model name
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
 
}
