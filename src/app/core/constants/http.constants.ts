export const HTTP_MESSAGES = {
  ERROR_RESPONSE: 'HTTP request failed',
  UNAUTHORIZED: 'Unauthorized request',
  UNCAUGHT_ERROR: 'Unhandled HTTP Error',
  UNKNOWN_ERROR: 'Unknown Error',
  GENERIC_ERROR: 'Unexpected Error',
  ERROR_0: 'No connection to the server',
  ERROR_404: 'Resource not found',
  ERROR_401: 'Unauthorized access',
  ERROR_500: 'Internal server error',
} as const;

export const HTTP_ERRORS: Record<number, string> = {
  0: HTTP_MESSAGES.ERROR_0,
  401: HTTP_MESSAGES.ERROR_401,
  404: HTTP_MESSAGES.ERROR_404,
  500: HTTP_MESSAGES.ERROR_500,
};
