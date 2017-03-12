import { SettingsGetter } from './SettingsGetter';
import { ILogger } from './AppLogger';

export interface IPlugin {
    name: string;
    defaultSettings: any;

    init(logger: ILogger, settingsGetter: SettingsGetter);
    shutdown();
}

