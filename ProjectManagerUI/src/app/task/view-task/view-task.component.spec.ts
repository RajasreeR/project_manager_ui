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
import { ViewTaskComponent } from './view-task.component';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskService } from '../../services/task.service';
import { CommonTaskService } from '../../utilities/common-service';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let service: TaskService;
  let confirmationService: ConfirmationService;
  let httpClient: HttpClient;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTaskComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, CalendarModule, SliderModule, HttpClientModule, FormsModule, DataTableModule, GrowlModule, FormsModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [TaskService, CommonTaskService, ConfirmationService,DatePipe]

    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;


  });
  describe('View task tests ', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have zero or more items in project popup', () => {
      component.ngOnInit();
      expect(component.projectsList.length).toBeGreaterThanOrEqual(0);
    });  
    it('should have zero or more items in tasks', () => {
      component.getAllTask(1);
      expect(component.tasksList.length).toBeGreaterThanOrEqual(0);
    });
    it('should return a success message', () => { 
      component.showConfirmation(true,"Sucess!");
     
      expect(component.messages.length) 
          .toBeGreaterThanOrEqual(1); 
    });   
    it('should display selected project name in textbox', () => { 
      component.assignProject("testProject",1);     
      expect(component.selectedProject) 
          .toBe("testProject"); 
    });
  });
});
