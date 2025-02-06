import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);

  loadingService.setValue(true);
  return next(req).pipe(
    finalize(() => setTimeout(() => loadingService.setValue(false), 3000)),
  );
}
