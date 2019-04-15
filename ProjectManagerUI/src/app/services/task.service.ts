import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ParentTask } from '../models/ParentTask';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}
  serviceUrl: string = environment.API_URL;
   
  getAllTasks(): Observable<any> {
   
    return this.http.get<any>(this.serviceUrl+"/api/tasks/getTasks");
    
  }
  updateTask(task:Task): Observable<any> {
    debugger;   
    return this.http.post<any>(this.serviceUrl+"/api/tasks/update",task);
    
  }
  getAllParentTasks(): Observable<any> {
   
    debugger;
    return this.http.get<any>(this.serviceUrl+"/api/tasks/getParentTasks");
    
  }
}
