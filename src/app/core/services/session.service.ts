import { SessionMapper } from '../models/auth/mappers/session.mapper';
import { SESSION_MESSAGES } from '../constants/session.constants';
import { LoggerService } from '@/core/services/logger.service';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { Session } from '../models/auth/session.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly STORAGE_KEY = STORAGE_KEYS.AUTH.SESSION;
  private readonly logger;

/**
 * Constructor for the SessionService.
 * It sets up the logger service with the context 'SessionService'.
 * @param loggerService - The logger service to use.
 */
  constructor(
    private loggerService: LoggerService
  ) {
    this.logger = this.loggerService.withContext('SessionService');
  }

  /**
   * Sets the session in the local storage.
   * The session is stored as a JSON string in the local storage.
   * A log message is written to the logger with the userId of the session.
   * @param session - The session to be stored in the local storage.
   */
  setSession(session: Session): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(SessionMapper.toJSON(session)));
    this.logger.info(SESSION_MESSAGES.STORED, { userId: session.userId }, );
  }

/**
 * Retrieves the session from the local storage.
 *
 * If the session is found, it parses the JSON data and returns the session.
 * If the session is not found, it logs a warning message and returns null.
 * If there is an error while parsing the JSON data, it logs an error message,
 * clears the session from the local storage and returns null.
 * @returns The session if found, otherwise null.
 */
  getSession(): Session | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        const session = SessionMapper.fromJSON(JSON.parse(data));
        this.logger.debug(
          SESSION_MESSAGES.RETRIEVED,
          { userId: session.userId },
          
        );
        return session;
      } catch (error) {
        this.logger.error(SESSION_MESSAGES.PARSE_ERROR, error, );
        this.clearSession();
        return null;
      }
    } else {
      this.logger.warn(SESSION_MESSAGES.NOT_FOUND, null, );
      return null;
    }
  }


/**
 * Clears the session from the local storage.
 *
 * It removes the session from the local storage.
 * After clearing the session, the user is no longer logged in.
 */
  clearSession(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.logger.info(SESSION_MESSAGES.DELETED, null, );
  }

/**
 * Checks if the user is logged in.
 *
 * It checks if there is a session stored in the local storage.
 * If there is a session, it means the user is logged in.
 *
 * @returns A boolean indicating if the user is logged in.
 */
  isLoggedIn(): boolean {
    const loggedIn = this.getSession() !== null;
    this.logger.debug(SESSION_MESSAGES.LOGGED_IN, { loggedIn }, );
    return loggedIn;
  }
}
