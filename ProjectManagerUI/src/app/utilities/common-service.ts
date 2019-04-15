import { Injectable } from '@angular/core';
import { Task } from '../models/task';


@Injectable()
export class CommonTaskService {

    public task:Task;
    constructor(){
        
    }
}