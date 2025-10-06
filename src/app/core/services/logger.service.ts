import { LogEntry, LogLevel } from '@/core/models/logger.model';
import { Environment } from '@/core/models/enviroment.model';
import { ENVIRONMENT } from '@/core/models/enviroment.token';
import { Injectable, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private readonly levels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal'];
  private currentLevel: LogLevel;

/**
 * Constructor for the LoggerService.
 * Sets the current log level based on the environment settings.
 * If the environment is production, the current log level is 'warn'.
 * If the environment is not production and logging is enabled, the current log level is 'debug'.
 * If the environment is not production and logging is disabled, the current log level is 'error'.
 * @param env - The environment settings to use.
 */
  constructor(@Inject(ENVIRONMENT) private env: Environment) {
    this.currentLevel = this.env.production
      ? 'warn'
      : this.env.logging
      ? 'debug'
      : 'error';
  }

  /**
   * Sets the current log level.
   * The log level is used to determine if a log entry should be logged or not.
   * If the target log level is greater than or equal to the current log level, the log entry should be logged.
   * @param {LogLevel} level - The log level to set.
   * @example
   * const logger = new LoggerService();
   * logger.setLogLevel('debug'); // current log level is 'debug'
   */
  setLogLevel(level: LogLevel) {
    this.currentLevel = level;
  }

  /**
   * Determines if a log entry with a given level should be logged based on the current log level.
   * If the target log level is greater than or equal to the current log level, the log entry should be logged.
   * @example
   * const logger = new LoggerService();
   * logger.setLogLevel('debug'); // current log level is 'debug'
   * logger.shouldLog('info'); // true
   * logger.shouldLog('error'); // true
   * logger.shouldLog('fatal'); // true
   * logger.shouldLog('warn'); // false
   */
  private shouldLog(level: LogLevel): boolean {
    const currentIndex = this.levels.indexOf(this.currentLevel);
    const targetIndex = this.levels.indexOf(level);
    return targetIndex >= currentIndex;
  }

  /**
   * Creates a log entry from a given level, message, data, and context.
   * @param level - The log level for the entry.
   * @param message - The message for the entry.
   * @param data - Optional data to log with the message.
   * @param context - Optional context to log with the message.
   * @returns A log entry object with the provided information.
   */
  private createEntry(level: LogLevel, message: string, data?: unknown, context?: string): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      data,
    };
  }

  /**
   * Formats a log entry into a string.
   * @param entry - The log entry to format.
   * @returns A string representation of the log entry.
   * @example
   * const entry = {
   *   level: 'debug',
   *   message: 'This is a debug message',
   *   timestamp: '2022-01-01T12:00:00.000Z',
   *   context: 'my-context',
   *   data: { foo: 'bar' }
   * };
   * const formattedEntry = logger.format(entry);
   * console.log(formattedEntry);
   * // Output: 2022-01-01T12:00:00.000Z [DEBUG] (my-context): This is a debug message -- {"foo":"bar"}
   */
  private format(entry: LogEntry): string {
    const { timestamp, level, context, message, data } = entry;
    let base = `${timestamp} [${level.toUpperCase()}]`;
    if (context) base += ` (${context})`;
    base += `: ${message}`;
    if (data) {
      try {
        base += ` -- ${JSON.stringify(data)}`;
      } catch {
        base += ` -- [Could not serialize data]`;
      }
    }
    return base;
  }

  /**
   * Logs a log entry to the console, based on the log level.
   * If the log level is 'debug' or 'info', it logs to console.log.
   * If the log level is 'warn', it logs to console.warn.
   * If the log level is 'error' or 'fatal', it logs to console.error.
   * If the log level is not recognized, it does not log anything.
   * @param entry - The log entry to be logged.
   */
  private logToConsole(entry: LogEntry) {
    if (!this.shouldLog(entry.level)) return;

    const formatted = this.format(entry);
    switch (entry.level) {
      case 'debug':
      case 'info':
        console.log(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'error':
      case 'fatal':
        console.error(formatted);
        break;
    }
  }

  /**
   * Logs a message with a given log level, message, and optional data and context.
   *
   * This method will create a log entry with the provided information and then log it to the console
   * if the log level is at or above the current log level.
   *
   * @param level The log level to use for the message.
   * @param message The message to log.
   * @param data Optional data to log with the message.
   * @param context Optional context to log with the message.
   */
  private log(level: LogLevel, message: string, data?: unknown, context?: string) {
    const entry = this.createEntry(level, message, data, context);
    this.logToConsole(entry);
  }

  /**
   * Logs a debug message with a given message and optional data and context.
   *
   * This log level should be used for debug messages that are not critical but still need to be logged.
   *
   * @param message The message to log.
   * @param data Optional data to log with the message.
   * @param context Optional context to log with the message.
   */
  debug(message: string, data?: unknown, context?: string) {
    this.log('debug', message, data, context);
  }

  /**
   * Logs an informational message with a given message and optional data and context.
   *
   * This log level should be used for informational messages that are not critical but still need to be logged.
   *
   * @param message The message to log.
   * @param data Optional data to log with the message.
   * @param context Optional context to log with the message.
   */
  info(message: string, data?: unknown, context?: string) {
    this.log('info', message, data, context);
  }

  /**
   * Logs a warning with a given message and optional data and context.
   *
   * This log level should be used for warnings that are not critical but still need to be logged.
   *
   * @param message The message to log.
   * @param data Optional data to log with the message.
   * @param context Optional context to log with the message.
   */
  warn(message: string, data?: unknown, context?: string) {
    this.log('warn', message, data, context);
  }

  /**
   * Logs an error with a given message and optional data and context.
   *
   * This log level should be used for errors that are not critical but still need to be logged.
   *
   * @param message The message to log.
   * @param data Optional data to log with the message.
   * @param context Optional context to log with the message.
   */
  error(message: string, data?: unknown, context?: string) {
    this.log('error', message, data, context);
  }

  /**
   * Logs a fatal error with a given message and optional data and context.
   *
   * This is the highest level of logging and should only be used for critical errors that prevent the application from running.
   *
   * @param message The message to log.
   * @param data Optional data to log with the message.
   * @param context Optional context to log with the message.
   */
  fatal(message: string, data?: unknown, context?: string) {
    this.log('fatal', message, data, context);
  }

  /**
   * Creates a scoped logger with a fixed context.
   */
  withContext(context: string) {
    return {
      debug: (msg: string, data?: unknown) => this.debug(msg, data, context),
      info: (msg: string, data?: unknown) => this.info(msg, data, context),
      warn: (msg: string, data?: unknown) => this.warn(msg, data, context),
      error: (msg: string, data?: unknown) => this.error(msg, data, context),
      fatal: (msg: string, data?: unknown) => this.fatal(msg, data, context),
    };
  }
}
