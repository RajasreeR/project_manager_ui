import { TestBed,async, inject } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService],
      imports:[
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));
  it('get all tasks should return real value', async(inject([TaskService], (service: TaskService) => {
    expect(service.getAllTasks()).toBeTruthy();
  })));
  it('get all parent tasks should return real value', async(inject([TaskService], (service: TaskService) => {
    expect(service.getAllParentTasks()).toBeTruthy();
  })));
});
