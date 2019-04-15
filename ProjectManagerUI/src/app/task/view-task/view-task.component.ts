import { Component, OnInit } from '@angular/core';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { CommonTaskService } from '../../utilities/common-service';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';

@Component({
    templateUrl: './view-task.component.html',
    styleUrls: ['./view-task.component.css'],
    providers: [ TaskService, ProjectService, ConfirmationService, DatePipe]
})

export class ViewTaskComponent implements OnInit {
    messages: Message[] = [];
    newProject: Project;

    tasksList: Task[] = [];

    projectsList: Project[] = [];
    selectedProject: String;
    selectedProjectId: Number;

    constructor(private router: Router, private taskService:CommonTaskService, private projectService: ProjectService, private service: TaskService,private confirmationService:ConfirmationService,private datePipe: DatePipe) { }
    ngOnInit() {
        this.getAllProject();
    }
    showConfirmation(status: boolean, message: string) {
        this.messages = [];
        if (status === true) {
            this.messages.push({ severity: 'success', summary: "Success", detail: message });
        }
        else {
            this.messages.push({ severity: 'error', summary: "Error", detail: message });

        }
        
    }
    getAllProject() {
        this.projectsList = [];
        this.projectService.getAllProject()
            .subscribe(data => { 
                this.projectsList = [];
                data.forEach(obj => {
                  this.newProject = { projectId: 0, Name: "", StartDate: "", EndDate: "", managerId: 0, managerName: "", numberOfTask: 0, status: ""};
                  this.newProject.projectId = obj.ProjectID;
                  this.newProject.StartDate = obj.StartDate;
                  this.newProject.EndDate = obj.EndDate;
                  this.newProject.priority = obj.Priority;
                  this.newProject.managerId = obj.ManagerId;
                  this.newProject.managerName = obj.ManagerName;
                  this.newProject.status = obj.Status;
                  this.newProject.Name = obj.Name;
                  this.newProject.numberOfTask = obj.TaskCount;
                  this.projectsList.push(this.newProject);
                })
             
            });
    }
    assignProject(projName, projId) {
        this.selectedProjectId = projId;
        this.selectedProject = projName;
        debugger;
        this.getAllTask(projId);
    }
    editTask(task: Task) {
        this.taskService.task=task;
        this.router.navigate(['/edittask']);
        
    }
    getAllTask(id: Number) {
        this.service.getAllTasks()
            .subscribe(data => { 
                this.tasksList = [];
                debugger;
                let taskTempList = data.filter(task => task.ProjectId === id);
                taskTempList.forEach(obj =>
                {
                    debugger;
                    let newTaskData = { "taskId": 0, "taskName": "", "parentId": 0, "parentName": "", "projectId": 0, "projectName": "", "userId": 0, "userName": "", "startDate": "", "endDate": "", "priority": 0, "status": true };
                    newTaskData.taskId = obj.TaskId;
                    newTaskData.taskName = obj.TaskName;
                    newTaskData.projectId = obj.ProjectId;
                    newTaskData.projectName = obj.ProjectName;
                    newTaskData.parentId = obj.ParentId;
                    newTaskData.parentName = obj.ParentName;
                    newTaskData.userId = obj.UserID;
                    newTaskData.userName = obj.UserName;
                    newTaskData.status = obj.Status;
                    newTaskData.startDate = obj.StartDate;
                    newTaskData.endDate = obj.EndDate;
                    newTaskData.priority = obj.Priority;
                    this.tasksList.push(newTaskData);
                })
                this.tasksList.length === 0 ? this.showConfirmation(false,"No tasks for selected project") : "";
            });
                
    }    
    endTask(task: Task) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to end this task?',
            accept: () => {
                task.status=false;
                debugger;
                this.service.updateTask(task)
                    .subscribe(data => { this.showConfirmation(data.Status.Result, data.Status.Message); });
            }
        });
    }
    
}