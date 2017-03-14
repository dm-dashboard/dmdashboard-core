import { IPlugin } from './IPlugin';
import { MongoConnection } from './MongoConnection';
import { ILogger } from './AppLogger';
export declare class SettingsGetterFactory {
    private logger;
    private mongo;
    constructor(logger: ILogger, mongo: MongoConnection);
    getInstance(plugin: IPlugin): SettingsGetter;
}
export declare class SettingsGetter {
    private plugin;
    private mongo;
    private logger;
    private pluginCollection;
    constructor(plugin: IPlugin, mongo: MongoConnection, logger: ILogger);
    get(): Promise<any>;
}
