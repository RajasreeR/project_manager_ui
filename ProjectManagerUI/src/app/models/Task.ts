import { Injectable } from '@angular/core';

export interface Task {
  taskId: number;
  taskName: string;
  parentId? : number;
  parentName?: string; 
  projectId? : number;
  projectName?: string;
  userId? : number;
  userName? : string;
  startDate?: string;
  endDate? : string;
  priority?: number;
  status: boolean;

}