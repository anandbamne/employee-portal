import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private apiUrl = 'https://6740c5b1d0b59228b7f14afd.mockapi.io/companyPortal/';
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'users');
  }
  GetRoleData():Observable<any>{
    return this.http.get<any>(this.apiUrl+'Roles');
  }
  deleteRole(userId:string): Observable<void>{
   return this.http.delete<void>(this.apiUrl+'Roles/'+userId);
  }
  putRoleData(userId:string,userData:any): Observable<void>{
    return this.http.put<void>(this.apiUrl+'Roles/'+userId,userData);
  }
  EditPermission(userId:string,userData:any):Observable<any>{
    return this.http.put<void>(this.apiUrl+'users/'+userId,userData);
  }
  deleteusers(userId:string): Observable<void>{
    return this.http.delete<void>(this.apiUrl+'users/'+userId);
   }
}
