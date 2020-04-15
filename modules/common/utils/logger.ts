import * as pino from 'pino';

export const logger = pino({
  enabled: process.env.NODE_ENV !== 'test',
  prettyPrint: process.env.NODE_ENV === 'development' && {
    errorProps: '*',
    translateTime: 'hh:MM:ss',
    ignore: 'pid,hostname',
  },
});
