 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskComponent } from './task/add-task/add-task.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/adduser', pathMatch: 'full' },
  { path: 'adduser', component: UserDetailsComponent },
  { path: 'addproject', component: ProjectDetailsComponent },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'viewtask', component: ViewTaskComponent },
  { path: 'edittask', component: AddTaskComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}