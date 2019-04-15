import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

import { DatePipe } from '@angular/common';
import { Message, ConfirmationService } from 'primeng/api';


@Component({
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css'],
    providers: [ProjectService, ConfirmationService, DatePipe, UserService]
})

export class ProjectDetailsComponent implements OnInit {
    public addOrUpdateBtn: string = 'Add';
    public addOrUpdateProjectDetailForm: FormGroup;
    userList: User[];
    projectsList: Project[];
    newProject: Project;
    newUser: User;
    startDate: Date;
    messages: Message[] = [];

    constructor(private formBuilder: FormBuilder, private service: ProjectService, private userService: UserService, private confirmationService: ConfirmationService, private datePipe: DatePipe) {

    }
    formInit() {
        this.addOrUpdateProjectDetailForm = this.formBuilder.group({
            projectId: [0, Validators.required],
            projectNameControl: [null, Validators.required],
            checkDatesControl: true,
            startDateControl: [null],
            endDateControl: [null],
            status: ["Active"],
            priorityControl: [null, Validators.required],
            selectedManagerControl: [null, Validators.required],
            selectedManagerName: [null, Validators.required],
            priorityDisplayControl: [null]
        });
    }
    ngOnInit() {
        this.formInit();
        this.getUsers();
        this.getAllProject();
    }
    getUsers() {
        this.userService.getUsers()
            .subscribe(data => {
                this.userList = [];
                data.forEach(obj => {
                    this.newUser = { Id: 0, employeeId: "", firstName: "", lastName: "", projectId: 0 };
                    this.newUser.Id = obj.ID,
                        this.newUser.firstName = obj.FirstName;
                    this.newUser.lastName = obj.LastName;
                    this.newUser.employeeId = obj.EmployeeId;
                    this.newUser.projectId = obj.ProjectId
                    this.userList.push(this.newUser);
                })

            });
    }
    getAllProject() {
        this.service.getAllProject()
            .subscribe(data => {
                this.projectsList = [];
                data.forEach(obj => {
                    this.newProject = { projectId: 0, Name: "", StartDate: "", EndDate: "", managerId: 0, managerName: "", numberOfTask: 0, status: "" };
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
    showConfirmation(status: boolean, message: string) {
        this.messages = [];
        if (status === true) {
            this.messages.push({ severity: 'success', summary: "Success", detail: message });
        }
        else {
            this.messages.push({ severity: 'error', summary: "Error", detail: message });

        }
        this.addProjectReset();
    }

    updateProject(project: Project) {
        debugger;
        this.addOrUpdateBtn = 'Update';
        this.addOrUpdateProjectDetailForm = this.formBuilder.group({
            projectId: [project.projectId, Validators.required],
            projectNameControl: [project.Name, Validators.required],
            checkDatesControl: [project.EndDate === null && project.StartDate === null ? false : true],
            startDateControl: [project.StartDate !== null ? this.datePipe.transform(project.StartDate, 'MM/dd/yyyy').toString() : ''],
            endDateControl: [project.EndDate !== null ? this.datePipe.transform(project.EndDate, 'MM/dd/yyyy').toString() : ''],
            status: [project.status],
            priorityControl: [project.priority, Validators.required],
            selectedManagerControl: [project.managerId, Validators.required],
            selectedManagerName: [project.managerName, Validators.required],
            priorityDisplayControl: [null]
        });

    }

    addProjectReset() {
        this.addOrUpdateProjectDetailForm.reset();
        debugger;
        this.formInit();
        this.addOrUpdateBtn = 'Add';
    }

    addUpdateProjectSubmit() {
        this.service.updateProject({
            projectId: this.addOrUpdateProjectDetailForm.get('projectId').value,
            EndDate: this.datePipe.transform(this.addOrUpdateProjectDetailForm.get('endDateControl').value, 'MM/dd/yyyy').toString(),
            StartDate: this.datePipe.transform(this.addOrUpdateProjectDetailForm.get('startDateControl').value, 'MM/dd/yyyy').toString(),
            managerId: this.addOrUpdateProjectDetailForm.get('selectedManagerControl').value,
            priority: this.addOrUpdateProjectDetailForm.get('priorityControl').value,
            Name: this.addOrUpdateProjectDetailForm.get('projectNameControl').value,
            status: this.addOrUpdateProjectDetailForm.get('status').value
        })
            .subscribe(data => {
                this.getAllProject();
                this.showConfirmation(data.Status.Result, data.Status.Message);
            });
    }



    assignManager(userId: number, mgrName: string) {
        debugger;
        this.addOrUpdateProjectDetailForm.patchValue({
            selectedManagerControl: userId,
            selectedManagerName: mgrName
        });
    }

    suspendProject(project: Project) {

        this.confirmationService.confirm({
            message: 'Are you sure that you want to suspend project : ' + project.Name + '?',
            accept: () => {
                project.status = "Suspended";
                this.service.updateProject(project)
                    .subscribe(data => {
                        this.getAllProject();
                        this.showConfirmation(data.status.Result, data.status.Message);
                    });
            }
        });
    }






}