import { Collection } from "mongodb";
import * as http from 'http';
import { ReflectiveInjector } from "injection-js";

declare interface ILogger {
    info(message: string);
    error(message: string);
    debug(message: string, error?: any);
}

declare class AppLogger  implements ILogger{
    info(message: string);
    error(message: string);
    debug(message: string, error: any);
    fork(name: string): ILogger;
}

declare class MongoConnection {
    connect(logger: ILogger): Promise<any>;
    getCollection(collectionName: string): Collection;
    close();
}

declare class Scheduler {
    start(logger : ILogger);
    registerCallback(callback: () => void, context: any, interval: number);
    shutdown();
}

declare class SettingsGetter {
    get(): Promise<any>;
}

declare class SocketManager {
    listen(logger: ILogger, server: http.Server);
    shutdown();
}

declare interface IWatchdogKicker {
    (): void;
}

declare class WatchDog {
    start(logger: ILogger);
    registerPlugin(name: string): IWatchdogKicker
    shutdown();
}

declare class PluginManager {
    load(logger: ILogger, rootLogger : AppLogger, container : ReflectiveInjector);
    restartPlugin(name: string) ;
    shutdown() 
}

declare interface IPlugin {
    name: string;
    defaultSettings: any;

    init(logger: ILogger, settingsGetter: SettingsGetter);
    shutdown();
}

declare class Configuration {
    environment: string;
    logging: ILoggingConfig;
    server: IServerConfig;
    mongo: IMongoConfig;
    plugins: string[];
    get(key: string): any;
}

declare interface ILoggingConfig {
    path: string;
    toConsole: boolean;
    level: string;
}

declare interface IMongoConfig {
    url: string;
}

declare interface IServerConfig {
    port: number;
    frontendLocation : string;
}

