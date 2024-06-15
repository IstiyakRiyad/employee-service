import os from 'node:os';

import { createLogger, format, transports } from 'winston';
import { Loggly } from 'winston-loggly-bulk';
import 'winston-daily-rotate-file';
import config from '../config';

const LOG_DIR = 'logs';
class LogManager {
    private readonly logger = createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        transports: [
            new transports.File({
                filename: `${LOG_DIR}/error.log`,
                level: 'error',
            }),
            new transports.File({ filename: `${LOG_DIR}/combined.log` }),
            new transports.DailyRotateFile({
                level: 'info',
                filename: `${LOG_DIR}/application-%DATE%.log`,
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
            }),
        ],
    });

    constructor() {
        if (config.NODE_ENV !== 'production') {
            this.logger.add(
                new transports.Console({
                    format: format.combine(format.colorize(), format.simple()),
                })
            );
        }


        if (config.LOGGLY_TOKEN && config.LOGGLY_SUBDOMAIN) {
            this.logger.add(
                new Loggly({
                    token: config.LOGGLY_TOKEN,
                    subdomain: config.LOGGLY_SUBDOMAIN,
                    tags: [os.hostname(), config.NODE_ENV],
                    json: true,
                })
            );
        }
        else {
            console.log('Loggly config not found');
        }
    }

    getLogger() {
        return this.logger;
    }
}

export default new LogManager().getLogger();
