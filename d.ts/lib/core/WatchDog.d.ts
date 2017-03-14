import { PluginManager } from './PluginManager';
import { Scheduler } from './Scheduler';
import { ILogger } from './AppLogger';
import { Configuration } from '../config/Configuration';
export interface IWatchdogKicker {
    (): void;
}
export declare class WatchDog {
    private config;
    private scheduler;
    private pluginManager;
    private logger;
    private lastKicks;
    constructor(config: Configuration, scheduler: Scheduler);
    setLogger(logger: ILogger): void;
    start(pluginManager: PluginManager): void;
    registerPlugin(name: string): IWatchdogKicker;
    private checkForDeadPlugins();
    shutdown(): void;
}
