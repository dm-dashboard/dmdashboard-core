/// <reference types="node" />
import { ILogger } from './AppLogger';
import { Configuration } from '../config/Configuration';
import * as http from 'http';
export declare class SocketManager {
    private config;
    private socketIOServer;
    private logger;
    constructor(config: Configuration);
    listen(logger: ILogger, server: http.Server): void;
    shutdown(): void;
}
