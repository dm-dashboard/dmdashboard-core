import { Configuration } from '../config/Configuration';
export interface ILogger {
    fork(name: string): ILogger;
    info(message: any): any;
    error(message: any): any;
    errorException(message: any, exception: Error): any;
    debug(message: any): any;
}
export declare class AppLogger implements ILogger {
    private logger;
    private coreTag;
    constructor(config: Configuration);
    fork(name: string): ILogger;
    info(message: any, tag?: string): void;
    debug(message: any, tag?: string): void;
    error(message: any, tag?: string): void;
    errorException(message: any, error: Error, tag?: string): void;
}
