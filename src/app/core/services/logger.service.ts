import { Injectable, isDevMode } from '@angular/core';
import { environment } from '@/../enviroments/environment';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  timestamp: string;
  data?: any;
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private currentLevel: LogLevel;

  constructor() {
    this.currentLevel = environment.production
      ? 'warn'
      : (environment['logging'] ? 'debug' : 'error');
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error', 'fatal'];
    const currentIndex = levels.indexOf(this.currentLevel);
    const targetIndex = levels.indexOf(level);
    return targetIndex >= currentIndex;
  }

  private format(entry: LogEntry): string {
    const { timestamp, level, context, message, data } = entry;
    let base = `${timestamp} [${level.toUpperCase()}]`;
    if (context) { base += ` (${context})`; }
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

  debug(message: string, data?: any, context?: string) {
    if (this.shouldLog('debug')) {
      const entry: LogEntry = { level: 'debug', message, timestamp: new Date().toISOString(), context, data };
      console.log(this.format(entry));
    }
  }

  info(message: string, data?: any, context?: string) {
    if (this.shouldLog('info')) {
      const entry: LogEntry = { level: 'info', message, timestamp: new Date().toISOString(), context, data };
      console.info(this.format(entry));
    }
  }

  warn(message: string, data?: any, context?: string) {
    if (this.shouldLog('warn')) {
      const entry: LogEntry = { level: 'warn', message, timestamp: new Date().toISOString(), context, data };
      console.warn(this.format(entry));
    }
  }

  error(message: string, data?: any, context?: string) {
    const entry: LogEntry = { level: 'error', message, timestamp: new Date().toISOString(), context, data };
    console.error(this.format(entry));
  }

  fatal(message: string, data?: any, context?: string) {
    const entry: LogEntry = { level: 'fatal', message, timestamp: new Date().toISOString(), context, data };
    console.error(this.format(entry));
  }
}
