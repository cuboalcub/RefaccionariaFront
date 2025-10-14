interface RoutesMap {
  LOGIN: string;
  REFRESH: string;
}

export const ROUTES: RoutesMap = {
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
} as const; 