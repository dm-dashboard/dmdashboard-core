import { WatchDog } from './WatchDog';
import { SettingsGetterFactory } from './SettingsGetter';
import { ILogger, AppLogger } from './AppLogger';
import { MongoConnection } from './MongoConnection';
import { Configuration } from '../config/Configuration';
import { IPlugin } from './IPlugin';
import * as path from 'path';
import * as fs from 'fs';
import { ReflectiveInjector, Injectable, FactoryProvider } from 'injection-js';

export interface IPluginManager {
    load(logger: ILogger, rootLogger: AppLogger, container: ReflectiveInjector);
    shutdown();
}

@Injectable()
export class PluginManager implements IPluginManager {
        rootLogger: AppLogger;

    private loadedPlugins: Map<string, IPlugin> = new Map();
    private logger: ILogger;
    private settingsGetterFactory: SettingsGetterFactory;

    constructor(private config: Configuration, private mongo: MongoConnection, private watchdog: WatchDog) {
        
    }


    load(logger: ILogger, rootLogger: AppLogger, container: ReflectiveInjector) {
        this.logger = logger;
        this.settingsGetterFactory = new SettingsGetterFactory(this.logger, this.mongo);
        this.rootLogger = rootLogger;

        this.logger.info(`Loading plugins from node_modules`);
        this.config.plugins.forEach(plugin => this.loadPlugin(plugin, container));

        for (let pluginName of this.loadedPlugins.keys()) {
            this.initPlugin(pluginName);
        };
    }

    private initPlugin(pluginName: string) {
        let plugin = this.loadedPlugins.get(pluginName);
        plugin.init(this.rootLogger.fork(`${pluginName}`), this.settingsGetterFactory.getInstance(plugin), this.watchdog.registerPlugin(pluginName));
    }

    private loadPlugin(name: string, container: ReflectiveInjector) {
        this.logger.info(`Loading plugin [${name}]`);
        let factoryType = (require(name)).default;
        let pluginInstance = container.resolveAndInstantiate(new factoryType() as FactoryProvider) as IPlugin;
        this.loadedPlugins.set(name, pluginInstance);
    }

    restartPlugin(name: string) {
        this.initPlugin(name);
    }

    shutdown() {
        this.logger.info('Shutting down');
        for (let plugin of this.loadedPlugins.values()) {
            plugin.shutdown();
        };
    }
}
