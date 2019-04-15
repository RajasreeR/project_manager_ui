import { Injectable } from '@angular/core';

export interface User{  
    Id: number; 
    firstName: string;
    lastName: string;
    employeeId: string;
    projectId?: number;
}