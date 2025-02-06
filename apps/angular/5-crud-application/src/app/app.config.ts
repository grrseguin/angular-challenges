import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { AppErrorHandler } from './AppErrorHandler';
import { loadingInterceptor } from './loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    { provide: ErrorHandler, useClass: AppErrorHandler },
  ],
};
