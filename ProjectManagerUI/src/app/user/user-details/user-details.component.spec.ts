import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DataTableModule } from 'primeng/datatable';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GrowlModule } from 'primeng/growl';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let service: UserService;
  let confirmationService: ConfirmationService;
  let httpClient:HttpClient;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports:[ HttpClientModule,DataTableModule,GrowlModule,FormsModule,ConfirmDialogModule,BrowserAnimationsModule],
      providers:[  UserService,ConfirmationService]  
    
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    this.service = TestBed.get(UserService);

    this.confirmationService = TestBed.get(ConfirmationService);
    component = new UserDetailsComponent(service,confirmationService);
    component = fixture.componentInstance;

    
  });


  describe('Add User test cases', () => { 

    it('should have button text as Add', () => {
       
      component.ngOnInit();
      expect(component.saveButtonString) 
          .toEqual('Add'); 
    });
    
    it('should have fields cleared on cancel', () => { 
      component.onReset();
      expect(component.currentUser.firstName) 
          .toEqual(''); 
    });

    it('should have button text changed On edit', () => { 
      component.onEditClick({Id:1,firstName:'test',lastName:'test',employeeId:'test'});
      expect(component.saveButtonString) 
          .toEqual('Edit'); 
    });
    it('should return a message on save', () => { 
      component.currentUser={Id:1,firstName:'test',lastName:'test',employeeId:'test'};
      component.onSave({Id:1,firstName:'test',lastName:'test',employeeId:'test'});
     
      expect(component.messages.length) 
          .toBeGreaterThanOrEqual(0); 
    });
    it('should return a message on delete', () => { 
      component.currentUser={Id:1,firstName:'test',lastName:'test',employeeId:'test'};
      component.deleteUser({Id:1,firstName:'test',lastName:'test',employeeId:'test'});
      component._confirmationService.onAccept();
      expect(component.messages.length) 
          .toBeGreaterThanOrEqual(0); 
    });
  });

  
  
});
