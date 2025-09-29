import { Injectable, Inject } from '@angular/core';
import { Environment } from '@/core/models/enviroment.model';
import { ENVIRONMENT } from '@/core/models/enviroment.token';
import { LogEntry, LogLevel } from '@/core/models/logger.model';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private readonly levels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal'];
  private currentLevel: LogLevel;

  constructor(@Inject(ENVIRONMENT) private env: Environment) {
    this.currentLevel = this.env.production ? 'warn' : this.env.logging ? 'debug' : 'error';
  }

  setLogLevel(level: LogLevel) {
    this.currentLevel = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const currentIndex = this.levels.indexOf(this.currentLevel);
    const targetIndex = this.levels.indexOf(level);
    return targetIndex >= currentIndex;
  }

  private format(entry: LogEntry): string {
    const { timestamp, level, context, message, data } = entry;
    let base = `${timestamp} [${level.toUpperCase()}]`;
    if (context) {
      base += ` (${context})`;
    }
    base += `: ${message}`;
    if (data) {
      try {
        base += ` -- ${JSON.stringify(data)}`;
      } catch (e) {
        base += ` -- [Could not serialize data]`;
      }
    }
    return base;
  }

  private logToConsole(entry: LogEntry) {
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

  debug(message: string, data?: any, context?: string) {
    if (this.shouldLog('debug')) {
      const entry: LogEntry = {
        level: 'debug',
        message,
        timestamp: new Date().toISOString(),
        context,
        data,
      };
      this.logToConsole(entry);
    }
  }

  info(message: string, data?: any, context?: string) {
    if (this.shouldLog('info')) {
      const entry: LogEntry = {
        level: 'info',
        message,
        timestamp: new Date().toISOString(),
        context,
        data,
      };
      this.logToConsole(entry);
    }
  }

  warn(message: string, data?: any, context?: string) {
    if (this.shouldLog('warn')) {
      const entry: LogEntry = {
        level: 'warn',
        message,
        timestamp: new Date().toISOString(),
        context,
        data,
      };
      this.logToConsole(entry);
    }
  }

  error(message: string, data?: any, context?: string) {
    if (this.shouldLog('error')) {
      const entry: LogEntry = {
        level: 'error',
        message,
        timestamp: new Date().toISOString(),
        context,
        data,
      };
      this.logToConsole(entry);
    }
  }

  fatal(message: string, data?: any, context?: string) {
    if (this.shouldLog('fatal')) {
      const entry: LogEntry = {
        level: 'fatal',
        message,
        timestamp: new Date().toISOString(),
        context,
        data,
      };
      this.logToConsole(entry);
    }
  }
}
