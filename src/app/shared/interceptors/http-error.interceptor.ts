
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      messageService.add({
        severity: 'error',
        summary: 'HTTP Error',
        detail: error.message || 'Unexpected error occurred'
      });
      return throwError(() => error);
    })
  );
};
