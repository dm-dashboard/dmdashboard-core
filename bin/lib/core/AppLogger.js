"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const Configuration_1 = require("../config/Configuration");
const winstonDailyRotate = require("winston-daily-rotate-file");
const injection_js_1 = require("injection-js");
const moment = require("moment");
const padFunction = require('right-pad');
const tagWidth = 20;
let AppLogger = class AppLogger {
    constructor(config) {
        this.coreTag = padFunction('core', tagWidth);
        let transports = [];
        if (config.logging.toConsole) {
            let consoleOptions = {
                timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss'),
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
    fork(name) {
        let parent = this;
        return {
            info(message) {
                parent.info(message, padFunction(name, tagWidth));
            },
            debug(message) {
                parent.debug(message, padFunction(name, tagWidth));
            },
            error(message) {
                parent.error(message, padFunction(name, tagWidth));
            },
            errorException(message, error) {
                parent.errorException(message, error, padFunction(name, tagWidth));
            },
            fork: (n) => this
        };
    }
    info(message, tag) {
        this.logger.info(`[${tag ? tag : this.coreTag}]  ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    }
    debug(message, tag) {
        this.logger.debug(`[${tag ? tag : this.coreTag}] ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    }
    error(message, tag) {
        this.logger.error(`[${tag ? tag : this.coreTag}] ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    }
    errorException(message, error, tag) {
        this.logger.error(`[${tag ? tag : this.coreTag}] ${typeof message === 'string' ? message : JSON.stringify(message)}`, error);
    }
};
AppLogger = __decorate([
    injection_js_1.Injectable(),
    __metadata("design:paramtypes", [Configuration_1.Configuration])
], AppLogger);
exports.AppLogger = AppLogger;
//# sourceMappingURL=AppLogger.js.map