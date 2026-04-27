// server/utils/recaptcha.ts
import { useRuntimeConfig, createError } from '#imports';

export interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const config = useRuntimeConfig();

  if (!config.recaptchaSecretKey) {
    console.warn('reCAPTCHA secret key not configured, skipping verification');
    return true; // Allow in development without key
  }

  // Verify reCAPTCHA token
  const verification: RecaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      secret: config.recaptchaSecretKey,
      response: token
    })
  }).then(r => r.json());

  if (!verification.success) {
    throw createError({
      statusCode: 403,
      statusMessage: 'reCAPTCHA verification failed',
      data: {
        reason: verification['error-codes'] || 'Unknown error'
      }
    });
  }

  // Check score for v3 (if available)
  if (verification.score !== undefined && verification.score < 0.5) {
    throw createError({
      statusCode: 403,
      statusMessage: 'reCAPTCHA verification failed - low score',
      data: {
        reason: 'Suspicious activity detected'
      }
    });
  }

  return verification.success;
}
