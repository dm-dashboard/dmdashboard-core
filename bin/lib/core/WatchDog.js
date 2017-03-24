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
const Scheduler_1 = require("./Scheduler");
const Configuration_1 = require("../config/Configuration");
const moment = require("moment");
const injection_js_1 = require("injection-js");
const watchdogTimeout = 10 * 60;
const checkInterval = 30;
let WatchDog = class WatchDog {
    constructor(config, scheduler) {
        this.config = config;
        this.scheduler = scheduler;
        this.lastKicks = new Map();
    }
    setLogger(logger) {
        this.logger = logger;
    }
    start(pluginManager) {
        this.pluginManager = pluginManager;
        this.logger.info('Watchdog starting up');
        this.scheduler.registerCallback(() => this.checkForDeadPlugins(), this, checkInterval * 1000);
    }
    registerPlugin(name) {
        this.logger.info(`Plugin [${name}] registered with the watchdog`);
        this.lastKicks.set(name, moment());
        return () => this.lastKicks.set(name, moment());
    }
    checkForDeadPlugins() {
        let allOK = true;
        let now = moment();
        this.logger.debug('Watchdog is keeping an eye on:');
        for (let pluginName of this.lastKicks.keys()) {
            let secondsSinceLastKick = now.diff(this.lastKicks.get(pluginName), 'seconds');
            this.logger.debug(`\t${pluginName} (last kick was ${secondsSinceLastKick} seconds ago)`);
            if (secondsSinceLastKick >= watchdogTimeout) {
                this.logger.error(`${pluginName} has not kicked the watchdog in ${secondsSinceLastKick} seconds, restarting`);
                this.pluginManager.restartPlugin(pluginName);
                this.lastKicks.set(pluginName, moment());
                allOK = false;
            }
        }
        if (allOK) {
            this.logger.debug(`All plugins appear to be running OK (i.e. i\'ve heard from them in the last ${watchdogTimeout} seconds)`);
        }
        this.logger.debug('\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
    }
    shutdown() {
        this.logger.info('Shutting down');
    }
};
WatchDog = __decorate([
    injection_js_1.Injectable(),
    __metadata("design:paramtypes", [Configuration_1.Configuration, Scheduler_1.Scheduler])
], WatchDog);
exports.WatchDog = WatchDog;
//# sourceMappingURL=WatchDog.js.map