import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  private apiUrl = 'https://6740c5b1d0b59228b7f14afd.mockapi.io/companyPortal/'; 

  constructor(private http: HttpClient) {}

  // Add a new user
  addUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl+'users', userData);
  }
  addRole(userData:any):Observable<any>{
    return this.http.post(this.apiUrl+'Roles',userData)
  }
}
