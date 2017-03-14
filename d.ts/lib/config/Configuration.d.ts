import { ILoggingConfig } from './ILoggingConfig';
import { IServerConfig } from './IServerConfig';
import { IMongoConfig } from './IMongoConfig';
export interface IConfiguration {
    environment: string;
    logging: ILoggingConfig;
    server: IServerConfig;
    mongo: IMongoConfig;
    plugins: string[];
    get(key: string): any;
}
export declare class Configuration implements IConfiguration {
    environment: string;
    logging: ILoggingConfig;
    server: IServerConfig;
    mongo: IMongoConfig;
    plugins: string[];
    constructor();
    get(key: string): any;
}
