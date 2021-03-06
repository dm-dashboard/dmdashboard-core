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
const config = require("config");
const injection_js_1 = require("injection-js");
let Configuration = class Configuration {
    constructor() {
        this.environment = process.env.NODE_ENV || 'default';
        this.logging = config.get('logging');
        this.server = config.get('server');
        this.mongo = config.get('mongo');
        this.plugins = config.get('plugins');
    }
    get(key) {
        return config.get(key);
    }
};
Configuration = __decorate([
    injection_js_1.Injectable(),
    __metadata("design:paramtypes", [])
], Configuration);
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map