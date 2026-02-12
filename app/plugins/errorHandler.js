// plugins/errorHandler.js
export default defineNuxtPlugin((nuxtApp) => {
  // Handle errors globally
  nuxtApp.hook('app:error', (error) => {
    console.error('Global error caught:', error);
    
    // Log error to external service (e.g., Sentry, LogRocket)
    // This is a placeholder - in production, you'd use a real error tracking service
    if (process.client) {
      // Client-side error logging
      logError(error, 'client');
    } else {
      // Server-side error logging
      logError(error, 'server');
    }
  });

  // Handle unhandled promise rejections
  if (process.client) {
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      logError(event.reason, 'client', 'unhandled-promise-rejection');
    });

    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      logError(event.error, 'client', 'global-error');
    });
  }

  // Provide error handling functions to the app
  return {
    provide: {
      handleError: (error, context = {}) => {
        console.error('Handled error:', error, context);
        logError(error, context.source || 'unknown', context.type || 'general');
      },
      logInfo: (message, context = {}) => {
        logMessage(message, 'info', context);
      },
      logWarning: (message, context = {}) => {
        logMessage(message, 'warning', context);
      },
      logError: (error, context = {}) => {
        logError(error, context.source || 'unknown', context.type || 'general');
      }
    }
  };
});

// Logging function
function logMessage(message, level = 'info', context = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    userAgent: process.client ? navigator.userAgent : 'server',
    url: process.client ? window.location.href : 'server',
  };

  // In a real application, you would send this to a logging service
  console[level === 'error' ? 'error' : level === 'warning' ? 'warn' : 'log'](logEntry);
  
  // Optionally store in a local log for debugging
  if (process.client) {
    const logs = JSON.parse(localStorage.getItem('appLogs') || '[]');
    logs.push(logEntry);
    // Keep only the last 1000 log entries
    if (logs.length > 1000) {
      logs.shift();
    }
    localStorage.setItem('appLogs', JSON.stringify(logs));
  }
}

// Error logging function
function logError(error, source = 'unknown', type = 'general') {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    type,
    source,
    message: error.message || error.toString(),
    stack: error.stack,
    userAgent: process.client ? navigator.userAgent : 'server',
    url: process.client ? window.location.href : 'server',
  };

  // In a real application, you would send this to an error tracking service
  console.error('Logged error:', errorInfo);
  
  // Store error in local storage for debugging
  if (process.client) {
    const errors = JSON.parse(localStorage.getItem('appErrors') || '[]');
    errors.push(errorInfo);
    // Keep only the last 100 error entries
    if (errors.length > 100) {
      errors.shift();
    }
    localStorage.setItem('appErrors', JSON.stringify(errors));
  }
}