import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}
  serviceUrl: string = environment.API_URL;  
  updateProject(proj:Project): Observable<any> {
    debugger;
    return this.http.post<any>(this.serviceUrl+"/api/projects/update",proj );
  }
  getAllProject(): Observable<any> {
    return this.http.get<any>(this.serviceUrl+"/api/projects/get");    
  }
}
