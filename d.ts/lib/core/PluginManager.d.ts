import { WatchDog } from './WatchDog';
import { ILogger, AppLogger } from './AppLogger';
import { MongoConnection } from './MongoConnection';
import { Configuration } from '../config/Configuration';
import { ReflectiveInjector } from 'injection-js';
export interface IPluginManager {
    load(logger: ILogger, rootLogger: AppLogger, container: ReflectiveInjector): any;
    shutdown(): any;
}
export declare class PluginManager implements IPluginManager {
    private config;
    private mongo;
    private watchdog;
    rootLogger: AppLogger;
    private loadedPlugins;
    private logger;
    private settingsGetterFactory;
    constructor(config: Configuration, mongo: MongoConnection, watchdog: WatchDog);
    load(logger: ILogger, rootLogger: AppLogger, container: ReflectiveInjector): void;
    private initPlugin(pluginName);
    private loadPlugin(name, container);
    restartPlugin(name: string): void;
    shutdown(): void;
}
