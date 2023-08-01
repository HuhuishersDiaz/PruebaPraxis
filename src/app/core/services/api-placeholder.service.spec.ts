import { TestBed } from '@angular/core/testing';

import { ApiPlaceholderService } from './api-placeholder.service';

describe('ApiPlaceholderService', () => {
  let service: ApiPlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPlaceholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
