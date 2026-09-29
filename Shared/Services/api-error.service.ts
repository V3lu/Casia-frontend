import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiErrorService {
  getMessage(error: HttpErrorResponse): string {
    if (error.status === 0) return 'The service is unavailable. Check your connection and try again.';
    if (error.status === 401) return 'Your session has expired. Please sign in again.';
    if (error.status === 403) return 'You do not have permission to perform this action.';
    if (error.status === 404) return 'The requested resource was not found.';

    if (typeof error.error === 'object' && error.error !== null && 'message' in error.error) {
      const message = error.error['message'];
      if (typeof message === 'string' && message.trim()) return message;
    }

    return 'Something went wrong while contacting the service. Please try again.';
  }
}