import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { CommonTaskService } from '../../utilities/common-service';
import { ParentTask } from '../../models/ParentTask';
import { Project } from '../../models/project';
import { User } from '../../models/User';
import { Task } from '../../models/task';
import { ProjectService } from '../../services/project.service';


@Component({
    selector: 'add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [TaskService, UserService, ProjectService, DatePipe]
})

export class AddTaskComponent implements OnInit {

    formMode: String = 'New Task';
    btnMode: String = 'Add';
    messages: Message[] = [];
    selectedProject: string = '';
    selectedUser: string = '';
    selectedTask: string = '';
    selectedUserId: Number = null;
    selectedPTaskId: Number = null;
    selectedProjectId: Number = null;
    newProject: Project;

    projectsList: Project[] = [];
    parentTasksList: ParentTask[] = [];
    parentnewTask: ParentTask;


    usersList: User[] = [];
    newUser: User;

    private myForm: FormGroup;
    public addTaskForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private taskService: CommonTaskService,
        private service: TaskService,
        private userService: UserService,
        private projectService: ProjectService,
        private datePipe: DatePipe
    ) {



        // check the route for edit and then subscribe to data service
        if (this.router.url === '/edittask') {
            if (this.taskService.task !== null) {
                debugger;
                this.editMode();
                this.onFormEditInit(this.taskService.task);

            }
        }

        else {
            this.onFormInit();
            this.enableControls();
        }

    }
    handleChange(event) {
        console.log(this.addTaskForm.get('IsParentTaskControl').value);
        if (this.addTaskForm.get('IsParentTaskControl').value == false) {
            this.enableControls();
        }
        else {
            this.disableControls();
        }
    }

    disableControls() {
        debugger;
        this.addTaskForm.get('PriorityControl').disable();
        this.addTaskForm.get('PriorityDisplayControl').disable();
        this.addTaskForm.get('StartDateControl').disable();
        this.addTaskForm.get('EndDateControl').disable();
    }
    enableControls() {
        this.addTaskForm.get('PriorityControl').enable();
        this.addTaskForm.get('StartDateControl').enable();
        this.addTaskForm.get('EndDateControl').enable();
        this.addTaskForm.get('PriorityDisplayControl').enable();
    }
    onFormInit() {
        this.addTaskForm = this.formBuilder.group({
            TaskId: [0],
            ProjectIdControl: [null, Validators.required],
            TaskNameControl: [null, Validators.required],
            IsParentTaskControl: [false],
            PriorityControl: [null, Validators.required],
            PriorityDisplayControl: [null],
            ParentTaskControl: [null],
            StartDateControl: [null, Validators.required],
            EndDateControl: [null, Validators.required],
            UserIdControl: [null]
        });
    }
    onFormEditInit(task: Task) {
        debugger;
        this.addTaskForm = this.formBuilder.group({
            TaskId: [task.taskId],
            ProjectIdControl: [task.projectId, Validators.required],
            TaskNameControl: [task.taskName, Validators.required],
            IsParentTaskControl: [(task.userId === null && task.priority === null && task.parentName === null) ? true : false],
            PriorityControl: [task.priority, Validators.required],
            PriorityDisplayControl: [task.priority],
            ParentTaskControl: [task.parentId],
            StartDateControl: [task.startDate ? this.datePipe.transform(task.startDate, 'MM/dd/yyyy').toString() : '', Validators.required],
            EndDateControl: [task.endDate ? this.datePipe.transform(task.endDate, 'MM/dd/yyyy').toString() : '', Validators.required],

            UserIdControl: [task.userId]
        });
        
        this.selectedProject = task.projectName;
        this.selectedUser = task.userName;
        this.selectedPTaskId = task.parentId;
        this.selectedTask = task.parentName;
    }

    ngOnInit() {
        this.getAllProject();
        this.getAllParentTask();
        this.getAllUsers();
    }

    getAllProject() {
        this.projectsList = [];
        this.projectService.getAllProject()
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
    getAllParentTask() {
        this.parentTasksList = [];
        this.service.getAllParentTasks()
            .subscribe(data => {
                this.parentTasksList = [];
                data.forEach(obj => {
                    debugger;
                    this.parentnewTask = { parentTaskId: 0, parentTaskName: "" };
                    this.parentnewTask.parentTaskId = obj.TaskId;
                    this.parentnewTask.parentTaskName = obj.TaskName;
                    this.parentTasksList.push(this.parentnewTask);
                });
            });
    }

    getAllUsers() {
        this.usersList = [];
        this.userService.getUsers()
            .subscribe(data => {
                this.usersList = [];
                data.forEach(obj => {
                    this.newUser = { Id: 0, employeeId: "", firstName: "", lastName: "", projectId: 0 };
                    this.newUser.Id = obj.ID,
                        this.newUser.firstName = obj.FirstName;
                    this.newUser.lastName = obj.LastName;
                    this.newUser.employeeId = obj.EmployeeId;
                    this.newUser.projectId = obj.ProjectId
                    this.usersList.push(this.newUser);
                })

            });
    }
    resetFields(): void {
        this.addTaskForm.reset();
    }

    selectProject(projectName, projectId) {
        this.selectedProjectId = projectId;
        this.selectedProject = projectName;
        this.addTaskForm.patchValue({
            ProjectIdControl: projectId
        });
    }

    assignUser(userId, userName) {
        this.selectedUserId = userId;
        this.selectedUser = userName;
        this.addTaskForm.patchValue({
            UserIdControl: userId
        });
    }

    selectPTask(pTaskId, pTaskName) {
        this.selectedPTaskId = pTaskId;
        this.selectedTask = pTaskName;
        this.addTaskForm.patchValue({
            ParentTaskControl: pTaskId
        });
    }

    addTaskSubmit() {
        this.service.updateTask({
            taskId: this.addTaskForm.get('TaskId').value,
            endDate: this.addTaskForm.get('EndDateControl').value !== null ? this.datePipe.transform(this.addTaskForm.get('EndDateControl').value, 'MM/dd/yyyy').toString() : null,
            projectId: this.addTaskForm.get('ProjectIdControl').value,
            startDate: this.addTaskForm.get('StartDateControl').value !== null ? this.datePipe.transform(this.addTaskForm.get('StartDateControl').value, 'MM/dd/yyyy').toString() : null,
            parentId: this.addTaskForm.get('ParentTaskControl').value,
            priority: this.addTaskForm.get('PriorityControl').value,
            status: true,
            taskName: this.addTaskForm.get('TaskNameControl').value,
            userId: this.addTaskForm.get('UserIdControl').value
        })
            .subscribe(data => { this.showConfirmation(data.Status.Result, data.Status.Message); this.resetFields(); });

    }

    editMode() {

        this.formMode = 'Edit Task';
        this.btnMode = 'Update';
    }

    showConfirmation(status: boolean, message: string) {
        this.messages = [];
        if (status === true) {
            this.messages.push({ severity: 'success', summary: "Success", detail: message });
        }
        else {
            this.messages.push({ severity: 'error', summary: "Error", detail: message });

        }
        this.getAllProject();

    }


}