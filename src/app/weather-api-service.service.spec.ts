import { TestBed } from '@angular/core/testing';

import { WeatherApiServiceService } from './weather-api-service.service';

describe('WeatherApiServiceService', () => {
  let service: WeatherApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
