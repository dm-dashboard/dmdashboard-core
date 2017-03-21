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
const SettingsGetter_1 = require("./SettingsGetter");
const MongoConnection_1 = require("./MongoConnection");
const Configuration_1 = require("../config/Configuration");
const path = require("path");
const fs = require("fs");
const injection_js_1 = require("injection-js");
let PluginManager = class PluginManager {
    constructor(config, mongo) {
        this.config = config;
        this.mongo = mongo;
        this.loadedPlugins = new Map();
        let location = config.plugins.location;
        if (!location) {
            throw new Error(`Please set the plugin directory in the config file\n /config/${this.config.environment}.json -> plugins.location\n`);
        }
        if (!fs.existsSync(location)) {
            throw new Error('Plugin directory does not exist, please correct in the config file\n plugins.location');
        }
        this.settingsGetterFactory = new SettingsGetter_1.SettingsGetterFactory(this.logger, this.mongo);
    }
    load(logger, container) {
        this.logger = logger;
        let location = path.resolve(this.config.plugins.location);
        this.logger.info(`Loading plugins from [${location}]`);
        this.config.plugins.enabled.forEach(plugin => this.loadPlugin(plugin, container));
        for (let pluginName of this.loadedPlugins.keys()) {
            let plugin = this.loadedPlugins.get(pluginName);
            plugin.init(this.logger.fork(`plugin-${pluginName}`), this.settingsGetterFactory.getInstance(plugin));
        }
        ;
    }
    loadPlugin(name, container) {
        this.logger.info('DIR' + __dirname);
        this.logger.info(`Loading plugin [${name}]`);
        let mainScript = path.resolve(path.join(this.config.plugins.location, name, 'pluginFactory.js'));
        if (!fs.existsSync(mainScript)) {
            throw new Error(`[${name}] could not be loaded - [${mainScript}] does not exist`);
        }
        let factoryType = (require(mainScript)).default;
        let pluginInstance = container.resolveAndInstantiate(new factoryType());
        this.loadedPlugins.set(name, pluginInstance);
    }
    restartPlugin(name) {
        let plugin = this.loadedPlugins.get(name);
        plugin.init(this.logger.fork(`plugin-${name}`), this.settingsGetterFactory.getInstance(plugin));
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
    __metadata("design:paramtypes", [Configuration_1.Configuration, MongoConnection_1.MongoConnection])
], PluginManager);
exports.PluginManager = PluginManager;
//# sourceMappingURL=PluginManager.js.map