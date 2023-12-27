import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineStatusService {
  // Service properties
  private apiUrl = 'http://localhost:3000/employees';

  // Constructor with dependency injection
  constructor(private http: HttpClient) { }
  // Method to update the online status of an employee
  updateOnlineStatus(employeeId: number, online: boolean): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.patch(url, { online });
  }
  // Method to get the online status of an employee
  getOnlineStatus(employeeId: number): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get(url);
  }


}
