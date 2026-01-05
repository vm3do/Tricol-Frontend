export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  apiTimeout: 30000, // 30 seconds
  tokenRefreshThreshold: 300000, // 5 minutes before expiration
  accessTokenExpiration: 1800000, // 30 minutes
  refreshTokenExpiration: 86400000, // 24 hours
  enableDebugLogs: true,
  enableConsoleErrors: true
};
