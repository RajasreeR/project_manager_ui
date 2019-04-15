import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DataTableModule } from 'primeng/datatable';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GrowlModule } from 'primeng/growl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { AddTaskComponent } from './add-task.component';
import { TaskService } from '../../services/task.service';
import { CommonTaskService } from '../../utilities/common-service';
import { UserService } from '../../services/user.service';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let confirmationService: ConfirmationService;
  let httpClient: HttpClient;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, CalendarModule, SliderModule, HttpClientModule, FormsModule, DataTableModule, GrowlModule, FormsModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [TaskService, CommonTaskService,UserService,DatePipe]

    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;


  });

  describe('Add Task test', () => {  
    it('should have button text as edit in edit mode', () => { 
      component.editMode();
      expect(component.formMode) 
          .toBe("Edit Task"); 
    });   
    it('should show selected project name', () => { 
      component.onFormEditInit({taskId:1,status:true,userId:null,projectName:'test',endDate:'01/01/2017',startDate:'01/10/2018',taskName :"test"});     
      expect(component.selectedProject) 
          .toBe("test"); 
    });          
    it('should set task project name ', () => { 
      component.selectProject("test",1);     
      expect(component.selectedProject) 
          .toBe("test"); 
    });      
    it('should set user name on select', () => { 
      component.assignUser(1,"test");     
      expect(component.selectedUser) 
          .toBe("test"); 
    });
    it('should set parent task name on select', () => { 
      component.selectPTask(1,"test");     
      expect(component.selectedTask) 
          .toBe("test"); 
    });
  });
});
