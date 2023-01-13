import { TestBed } from '@angular/core/testing';

import { ApiUrlInterceptorInterceptor } from './api-url-interceptor.interceptor';

describe('ApiUrlInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiUrlInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiUrlInterceptorInterceptor = TestBed.inject(ApiUrlInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
