import * as winston from 'winston';
import { Configuration } from '../config/Configuration';
import * as winstonDailyRotate from 'winston-daily-rotate-file';
import { Injectable } from 'injection-js';
import * as moment from 'moment';

const padFunction = require('right-pad');
const tagWidth = 20;

export interface ILogger {
    fork(name: string): ILogger;
    info(message: string);
    error(message: string);
    errorException(message: string, exception: Error);
    debug(message: string);
}

@Injectable()
export class AppLogger  implements ILogger {
    private logger: winston.LoggerInstance;
    private coreTag = padFunction('core', tagWidth);

    constructor(config: Configuration) {
        let transports: winston.TransportInstance[] = [];

        if (config.logging.toConsole) {
            let consoleOptions: winston.ConsoleTransportOptions = {
                timestamp: ()=> moment().format('YYYY-MM-DD HH:mm:ss'),                
                colorize: true,
                json: false,
                humanReadableUnhandledException: false,
                level: config.logging.level,
                name: 'Console',
                prettyPrint: true,
                handleExceptions: false
            };
            transports.push(new (winston.transports.Console)(consoleOptions));
        }


        let fileOptions = {
            timestamp: true,
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            dirname: config.logging.path,
            filename: 'dm-dashboard.log',
            handleExceptions: true,
            level: config.logging.level,
            json: false
        };
        transports.push(new (winstonDailyRotate)(fileOptions));

        this.logger = new winston.Logger({
            transports: transports
        });
    }

    fork(name: string): ILogger {
        let parent = this;
        return {
            info(message: string) {
                parent.info(message, padFunction(name, tagWidth));
            },
            debug(message: string) {
                parent.debug(message, padFunction(name, tagWidth));
            },
            error(message: string) {
                parent.error(message, padFunction(name, tagWidth));
            },
            errorException(message: string, error: Error) {
                parent.errorException(message, error, padFunction(name, tagWidth));
            },
            fork: (n: string) => this
        };
    }


    info(message: string, tag?: string) {
        this.logger.info(`[${tag ? tag : this.coreTag}]  ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    }

    debug(message: string, tag?: string) {
        this.logger.debug(`[${tag ? tag : this.coreTag}] ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    }

    error(message: string, tag?: string) {
        this.logger.error(`[${tag ? tag : this.coreTag}] ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    }

    errorException(message: string, error: Error, tag?: string) {
        this.logger.error(`[${tag ? tag : this.coreTag}] ${typeof message === 'string' ? message : JSON.stringify(message)}`, error);
    }
}
