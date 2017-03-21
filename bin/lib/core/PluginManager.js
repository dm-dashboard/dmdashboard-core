"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const WatchDog_1 = require("./WatchDog");
const SettingsGetter_1 = require("./SettingsGetter");
const MongoConnection_1 = require("./MongoConnection");
const Configuration_1 = require("../config/Configuration");
const injection_js_1 = require("injection-js");
let PluginManager = class PluginManager {
    constructor(config, mongo, watchdog) {
        this.config = config;
        this.mongo = mongo;
        this.watchdog = watchdog;
        this.loadedPlugins = new Map();
    }
    load(logger, rootLogger, container) {
        this.logger = logger;
        this.settingsGetterFactory = new SettingsGetter_1.SettingsGetterFactory(this.logger, this.mongo);
        this.rootLogger = rootLogger;
        this.logger.info(`Loading plugins from node_modules`);
        this.config.plugins.forEach(plugin => this.loadPlugin(plugin, container));
        for (let pluginName of this.loadedPlugins.keys()) {
            this.initPlugin(pluginName);
        }
        ;
    }
    initPlugin(pluginName) {
        let plugin = this.loadedPlugins.get(pluginName);
        plugin.init(this.rootLogger.fork(`${pluginName}`), this.settingsGetterFactory.getInstance(plugin), this.watchdog.registerPlugin(pluginName));
    }
    loadPlugin(name, container) {
        this.logger.info(`Loading plugin [${name}]`);
        let factoryType = (require(name)).default;
        let pluginInstance = container.resolveAndInstantiate(new factoryType());
        this.loadedPlugins.set(name, pluginInstance);
    }
    restartPlugin(name) {
        this.initPlugin(name);
    }
    shutdown() {
        this.logger.info('Shutting down');
        for (let plugin of this.loadedPlugins.values()) {
            plugin.shutdown();
        }
        ;
    }
};
PluginManager = __decorate([
    injection_js_1.Injectable(),
    __metadata("design:paramtypes", [Configuration_1.Configuration, MongoConnection_1.MongoConnection, WatchDog_1.WatchDog])
], PluginManager);
exports.PluginManager = PluginManager;
//# sourceMappingURL=PluginManager.js.map