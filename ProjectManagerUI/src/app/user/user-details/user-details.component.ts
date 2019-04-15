import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css'],
    providers: [UserService, ConfirmationService]
})

export class UserDetailsComponent implements OnInit {
    @ViewChild('f') form;
    _confirmationService: ConfirmationService

    messages: Message[] = [];
    saveButtonString: String;
    userList: User[];
    currentUser: User;
    newUser: User;
    status:boolean;
    
       
    
    constructor(private service: UserService, private confirmationService: ConfirmationService) {
        this._confirmationService=confirmationService;
     }
    ngOnInit(): void {
        this.saveButtonString = "Add";
        this.onReset();
        this.getUsers();
    }
   
     onEditClick(user: User) {
        this.saveButtonString = "Edit";

        this.currentUser = Object.assign({}, this.currentUser, user);
    }
    onSave(user: User) {       
        this.updateUser(this.currentUser);    
    }
    
    onReset() {
        this.saveButtonString = "Add";
        this.currentUser = { Id: 0, employeeId: "", firstName: "", lastName: "" };
        this.form.reset();
    }

    showConfirmation(status: boolean, message: string) {
        this.messages=[];
        if (status === true) {
            this.messages.push({ severity: 'success', summary: "Success", detail: message});
        }
        else {
            this.messages.push({ severity: 'error', summary: "Error", detail: message });
        }
        this.getUsers();
        this.onReset();
    }
    getUsers() {
        this.service.getUsers()
            .subscribe(data => 
                {
                    this.userList = [];
                    data.forEach(obj =>{
                        debugger;
                        this.newUser =  { Id: 0, employeeId: "", firstName: "", lastName: "", projectId: 0 };
                        this.newUser.Id = obj.ID,
                        this.newUser.firstName = obj.FirstName;
                        this.newUser.lastName = obj.LastName;
                        this.newUser.employeeId = obj.EmployeeId;
                        this.newUser.projectId = obj.ProjectId
                        this.userList.push(this.newUser);
                    })
                    
                 });
    }
    updateUser(user: User) {       
        this.service.updateUsers(user)
            .subscribe(data => {  
                debugger;          
                this.showConfirmation(data.Status.Result,data.Status.Message);                
            });
    }
    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete user : ' + user.employeeId + '?',
            accept: () => {
                this.service.deleteUser(user)
                .subscribe(data => {
                    this.showConfirmation(data.Result,data.Message);
                });            }
        });
    }

}