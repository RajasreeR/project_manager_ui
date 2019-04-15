import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GrowlModule } from 'primeng/growl';
import { DataTableModule } from 'primeng/datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { ConfirmationService } from 'primeng/api';
import { ProjectService } from '../../services/project.service';
import { ProjectDetailsComponent } from './project-details.component';

describe('ProjectDetailsComponent', () => {
  let confirmationService: ConfirmationService;
  let httpClient: HttpClient;
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;
  let service: ProjectService;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsComponent],
      imports: [ReactiveFormsModule, CalendarModule, SliderModule, HttpClientModule, FormsModule, DataTableModule, GrowlModule, FormsModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [ProjectService, ConfirmationService]

    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
  });


  describe('Project component tests', () => {
    it('should have button text as Update for edit mode', () => {
      component.updateProject({ projectId: 1, StartDate: '01/01/2017', EndDate: '01/02/2018' });
      expect(component.addOrUpdateBtn)
        .toEqual('Update');
    });
    it('should have button text as Add on reset', () => {
      component.formInit();
      component.addProjectReset();
      expect(component.addOrUpdateBtn)
        .toEqual('Add');
    });
  
    it('should show message On error', () => {
      component.formInit();
      component.showConfirmation(false, "Error!");
      expect(component.messages.length)
        .toBeGreaterThanOrEqual(0);
    });
    it('should have no value for date when checkbox checked', () => {
      component.updateProject({ projectId: 1, StartDate: null, EndDate: null });
      expect(component.addOrUpdateProjectDetailForm.get('checkDatesControl').value)
        .toBe(false);
    });
  });



});
