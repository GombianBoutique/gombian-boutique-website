// server/utils/logger.ts
/**
 * Logging Utility - Structured logging for debugging and monitoring
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  timestamp: string
  level: LogLevel
  service: string
  action: string
  message: string
  userId?: string
  requestId?: string
  data?: any
  duration?: number
  error?: {
    message: string
    stack?: string
    code?: string
  }
}

// Log levels with numeric values for filtering
const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

// Current log level (can be configured via environment)
const CURRENT_LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'

// Service name for logs
const SERVICE_NAME = 'gombian-boutique-api'

/**
 * Format log entry as JSON
 */
const formatLogEntry = (entry: LogEntry): string => {
  return JSON.stringify(entry)
}

/**
 * Get request ID from event or generate new one
 */
const getRequestId = (event?: any): string => {
  if (event?.context?.requestId) {
    return event.context.requestId
  }
  return `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get user ID from event
 */
const getUserId = (event?: any): string | undefined => {
  return event?.context?.userId
}

/**
 * Core logging function
 */
const log = (
  level: LogLevel,
  action: string,
  message: string,
  data?: any,
  event?: any
) => {
  // Check if level should be logged
  if (LOG_LEVELS[level] < LOG_LEVELS[CURRENT_LOG_LEVEL]) {
    return
  }

  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    service: SERVICE_NAME,
    action,
    message,
    userId: getUserId(event),
    requestId: getRequestId(event),
    ...(data ? { data } : {})
  }

  // Output log based on level
  const logOutput = formatLogEntry(entry)
  
  switch (level) {
    case 'error':
      console.error(logOutput)
      break
    case 'warn':
      console.warn(logOutput)
      break
    default:
      console.log(logOutput)
  }
}

/**
 * Log with error details
 */
const logError = (
  action: string,
  message: string,
  error: any,
  event?: any
) => {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: 'error',
    service: SERVICE_NAME,
    action,
    message,
    userId: getUserId(event),
    requestId: getRequestId(event),
    error: {
      message: error?.message || String(error),
      stack: error?.stack,
      code: error?.code
    }
  }

  console.error(formatLogEntry(entry))
}

/**
 * Log API request
 */
const logRequest = (
  event: any,
  method: string,
  path: string
) => {
  log('info', 'REQUEST', `${method} ${path}`, {
    method,
    path,
    query: event?.query,
    headers: {
      'user-agent': event?.headers?.['user-agent'],
      'content-type': event?.headers?.['content-type']
    }
  }, event)
}

/**
 * Log API response
 */
const logResponse = (
  event: any,
  method: string,
  path: string,
  statusCode: number,
  duration: number
) => {
  const level: LogLevel = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info'
  
  log(level, 'RESPONSE', `${method} ${path} - ${statusCode}`, {
    method,
    path,
    statusCode,
    duration: `${duration}ms`
  }, event)
}

/**
 * Log authentication event
 */
const logAuth = (
  action: 'login' | 'logout' | 'register' | 'token_refresh',
  success: boolean,
  userId?: string,
  details?: any,
  event?: any
) => {
  const level: LogLevel = success ? 'info' : 'warn'
  
  log(level, `AUTH_${action.toUpperCase()}`, 
    success ? `${action} successful` : `${action} failed`,
    {
      userId,
      success,
      ...details
    },
    event
  )
}

/**
 * Log cart operation
 */
const logCart = (
  action: 'fetch' | 'save' | 'delete' | 'merge',
  userId: string,
  itemCount: number,
  details?: any,
  event?: any
) => {
  log('info', `CART_${action.toUpperCase()}`, 
    `Cart ${action} for user ${userId}`,
    {
      userId,
      itemCount,
      ...details
    },
    event
  )
}

/**
 * Log order operation
 */
const logOrder = (
  action: 'create' | 'fetch' | 'update' | 'cancel',
  orderNumber: string,
  userId?: string,
  details?: any,
  event?: any
) => {
  const level: LogLevel = action === 'create' ? 'info' : 'debug'
  
  log(level, `ORDER_${action.toUpperCase()}`, 
    `Order ${action}: ${orderNumber}`,
    {
      orderNumber,
      userId,
      ...details
    },
    event
  )
}

/**
 * Log address operation
 */
const logAddress = (
  action: 'create' | 'update' | 'delete' | 'fetch',
  addressId: string,
  userId: string,
  details?: any,
  event?: any
) => {
  log('info', `ADDRESS_${action.toUpperCase()}`, 
    `Address ${action}: ${addressId}`,
    {
      addressId,
      userId,
      ...details
    },
    event
  )
}

/**
 * Log performance metric
 */
const logPerformance = (
  action: string,
  duration: number,
  threshold: number = 1000,
  details?: any,
  event?: any
) => {
  const level: LogLevel = duration > threshold ? 'warn' : 'debug'
  
  log(level, `PERF_${action.toUpperCase()}`, 
    `Performance: ${duration}ms (threshold: ${threshold}ms)`,
    {
      duration,
      threshold,
      slow: duration > threshold,
      ...details
    },
    event
  )
}

// Export convenience methods
export const logger = {
  debug: (action: string, message: string, data?: any, event?: any) => 
    log('debug', action, message, data, event),
  
  info: (action: string, message: string, data?: any, event?: any) => 
    log('info', action, message, data, event),
  
  warn: (action: string, message: string, data?: any, event?: any) => 
    log('warn', action, message, data, event),
  
  error: (action: string, message: string, data?: any, event?: any) => 
    log('error', action, message, data, event),
  
  errorDetail: logError,
  request: logRequest,
  response: logResponse,
  auth: logAuth,
  cart: logCart,
  order: logOrder,
  address: logAddress,
  performance: logPerformance
}
