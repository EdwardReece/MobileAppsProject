import { TestBed } from '@angular/core/testing';

import { CreateJobService } from './creat-job.service';

describe('CreatJobService', () => {
  let service: CreateJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
