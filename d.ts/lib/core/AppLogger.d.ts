import { Configuration } from '../config/Configuration';
export interface ILogger {
    fork(name: string): ILogger;
    info(message: string): any;
    error(message: string, error?: any): any;
    debug(message: string): any;
}
export declare class AppLogger implements ILogger {
    private logger;
    private coreTag;
    constructor(config: Configuration);
    fork(name: string): ILogger;
    info(message: string, tag?: string): void;
    debug(message: string, tag?: string): void;
    error(message: string, tag?: string, error?: any): void;
}
