import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { Status } from '../models/status';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService { 
  constructor(private http: HttpClient) {}
  serviceUrl: string = environment.API_URL;
  
  getUsers(): Observable<any[]> {   
    debugger;
    return this.http.get<any[]>(this.serviceUrl + "/api/users/get");
    
  }
  updateUsers(user:User): Observable<any> {
    
    return this.http.post<any>(this.serviceUrl + "/api/users/update",user );
  }
  deleteUser(user:User): Observable<Status> {
      return this.http.post<Status>(this.serviceUrl + "/api/users/delete",user);
  }

}
