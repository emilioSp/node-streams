import { nanoid } from 'nanoid';
import jwt from 'jwt-simple';
import asyncLocalStorage from './asyncStorage.js';
import logger from './logger.js';
import APIError from './APIError.js';

export const errorManager = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(error);
    const errorResponse = !(error instanceof APIError) ? new APIError({ message: 'Internal server error.', http_code: 500 }) : error;
    ctx.status = errorResponse.http_code;
    ctx.body = { ...errorResponse, transactionId: asyncLocalStorage.getStore().transactionId };
  }
};

export const logRoute = async (ctx, next) => {
  const start = new Date();

  try {
    await next();
  } finally {
    const end = new Date();

    const info = {
      time: end.toISOString(),
      ip: ctx.ips.length > 0 ? ctx.ips[0] : ctx.ip,
      method: ctx.method,
      url: ctx.originalUrl,
      duration: `${end.getTime() - start.getTime()}ms`,
      status: ctx.status,
    };

    logger.info(info);
  }
};

export const requestTracking = async (ctx, next) => {
  const store = { transactionId: nanoid() };
  asyncLocalStorage.enterWith(store);
  await next();
};

export const authenticate = async (ctx, next) => {
  try {
    const payload = jwt.decode(ctx.request.token, process.env.JWT_SECRET);
    ctx.request.jwtPayload = payload;
  } catch (e) {
    throw new APIError({ http_code: 401, message: 'Unauthorized' });
  }
  await next();
};

export const bearerToken = async (ctx, next) => {
  const [, token] = ctx.request.headers?.authorization?.split(' ') ?? [0, null];
  ctx.request.token = token;
  await next();
};
