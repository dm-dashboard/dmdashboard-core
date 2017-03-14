import { ILogger } from './AppLogger';
import { Configuration } from '../config/Configuration';
export declare class Scheduler {
    private config;
    private schedule;
    private logger;
    constructor(config: Configuration);
    start(logger: ILogger): Promise<any>;
    registerCallback(callback: () => void, context: any, interval: number): void;
    shutdown(): void;
}
