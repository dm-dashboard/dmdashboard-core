import { IWatchdogKicker } from './WatchDog';
import { SettingsGetter } from './SettingsGetter';
import { ILogger } from './AppLogger';
export interface IPlugin {
    name: string;
    defaultSettings: any;
    init(logger: ILogger, settingsGetter: SettingsGetter, watchdogKicker: IWatchdogKicker): any;
    shutdown(): any;
}
