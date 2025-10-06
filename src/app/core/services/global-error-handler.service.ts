import { LoggerService } from '@/core/services/logger.service';
import { HTTP_MESSAGES } from '../constants/http.constants';
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandlerService implements ErrorHandler {
  private readonly logger;
  
/**
 * Constructor for the GlobalErrorHandlerService.
 * @param loggerService - The logger service to log messages.
 */
  constructor(
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.withContext('GlobalErrorHandler');
  }
  
  /**
   * Handles an error by logging it and rethrowing it with a user-friendly message.
   * If the error is an instance of HttpErrorResponse, it will log the error with the HTTP status code and message.
   * If the error is an instance of Error, it will log the error with the error message.
   * If the error is not an instance of HttpErrorResponse or Error, it will log the error with a generic message.
   * @param error - The error to be handled.
   */
  handleError(error: unknown): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else if (error instanceof Error) {
      this.handleGenericError(error);
    } else {
      this.handleUnknownError(error);
    }

    this.logger.fatal(HTTP_MESSAGES.ERROR_RESPONSE, { originalError: error });
  }

  /**
   * Handles an HTTP error by logging it with the HTTP status code and message.
   * It also logs the error stack and URL if available.
   * @param error - The HTTP error to be handled.
   */
  private handleHttpError(error: HttpErrorResponse): void {
    const details = {
      message: `HTTP ${error.status}: ${error.message}`,
      stack: error.error?.toString(),
      url: error.url,
    };
    this.logger.error(HTTP_MESSAGES.UNCAUGHT_ERROR, details);
  }

  /**
   * Handles a generic error by logging it with a fatal log level.
   * It logs the error message and stack if available.
   * @param error - The error to be handled.
   */
  private handleGenericError(error: Error): void {
    const details = { 
      message: error.message, 
      stack: error.stack 
    };
    this.logger.fatal(HTTP_MESSAGES.GENERIC_ERROR, details);
  }

  /**
   * Handles an unknown error by logging it with a fatal log level.
   * It logs the error message if available, otherwise it logs 'Unknown error'.
   * @param error - The unknown error to be handled.
   */
  private handleUnknownError(error: unknown): void {
    const details = { 
      message: error?.toString() ?? 'Unknown error' 
    };
    this.logger.fatal(HTTP_MESSAGES.UNKNOWN_ERROR, details);
  }
}
