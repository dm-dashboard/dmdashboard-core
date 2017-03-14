import { ILogger } from './AppLogger';
import { Configuration } from '../config/Configuration';
import { Collection } from 'mongodb';
export declare class MongoConnection {
    private config;
    private database;
    private logger;
    constructor(config: Configuration);
    connect(logger: ILogger): Promise<any>;
    getCollection(collectionName: string): Collection;
    close(): void;
}
