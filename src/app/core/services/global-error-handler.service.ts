import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LoggerService } from '@/core/services/logger.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error: any): void {
    const logger = this.injector.get(LoggerService);

    const message = error?.message || error.toString();
    const stack = error?.stack;

    logger.error('Uncaught Error (Global)', { message,stack }, 'GlobalErrorHandler');
  }
}
