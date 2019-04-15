import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DataTableModule} from 'primeng/datatable';
import {GrowlModule} from 'primeng/growl';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ViewTaskComponent } from './task/view-task/view-task.component';
import { CommonTaskService } from './utilities/common-service';
import {SliderModule} from 'primeng/slider';
import {CalendarModule} from 'primeng/calendar';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    ProjectDetailsComponent,
    AddTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IonRangeSliderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,DataTableModule,GrowlModule,ConfirmDialogModule,SliderModule,CalendarModule
  ],
  providers:[ CommonTaskService]  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
