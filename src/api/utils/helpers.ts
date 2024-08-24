import { strings } from '@/core/utils';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import * as morgan from 'morgan';
import httpResponses from './httpResponses';

const printMsgAPIRunning = (port: number, serverMode: string): void => {
  console.log(`\n${strings.applicationRunning} ${port}\n${strings.serverMode} ${serverMode}\n`);
};

/**
 * Get the configuration for the rate limiter.
 * @returns RateLimitRequestHandler
 */
const getConfigLimiter = (): RateLimitRequestHandler => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    handler: (req, res) => httpResponses.tooManyRequests(res),
    validate: {
      trustProxy: false,
    },
  });

  return limiter;
};

/**
 * Set the date token for morgan.
 */
const setMorganDateToken = (): void => {
  morgan.token('date', function () {
    const p = new Date()
      .toString()
      .replace(/[A-Z]{3}\+/, '+')
      .split(/ /);
    return p[2] + '/' + p[1] + '/' + p[3] + ' ' + p[4];
  });
};

export default {
  printMsgAPIRunning,
  getConfigLimiter,
  setMorganDateToken,
};
