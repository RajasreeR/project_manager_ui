import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService],
      imports:[
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
  it('get all projects should return real value', async(inject([ProjectService], (service: ProjectService) => {
    expect(service.getAllProject()).toBeTruthy();
  })));  
});
