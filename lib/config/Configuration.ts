import * as config from 'config';

import { ILoggingConfig } from './ILoggingConfig';
import { IServerConfig } from './IServerConfig';
import { IMongoConfig } from './IMongoConfig';
import { Injectable } from "injection-js";

export interface IConfiguration {
    environment: string;
    logging: ILoggingConfig;
    server: IServerConfig;
    mongo: IMongoConfig;
    plugins: string[];
    get(key: string): any;

}

@Injectable()
export class Configuration implements IConfiguration {
    environment: string;
    logging: ILoggingConfig;
    server: IServerConfig;
    mongo: IMongoConfig;
    plugins: string[];

    constructor() {
        this.environment = process.env.NODE_ENV || 'default';

        this.logging = config.get('logging') as ILoggingConfig;
        this.server = config.get('server') as IServerConfig;
        this.mongo = config.get('mongo') as IMongoConfig;
        this.plugins = config.get('plugins') as string[];
    }

    get(key: string): any {
        return config.get(key);
    }
}
