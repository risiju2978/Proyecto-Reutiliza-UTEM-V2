import { TestBed } from '@angular/core/testing';

import { CallServicesService } from './call-services.service';

describe('CallServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CallServicesService = TestBed.get(CallServicesService);
    expect(service).toBeTruthy();
  });
});
