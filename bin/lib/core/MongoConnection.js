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
const Configuration_1 = require("../config/Configuration");
const mongodb_1 = require("mongodb");
const injection_js_1 = require("injection-js");
let MongoConnection = class MongoConnection {
    constructor(config) {
        this.config = config;
    }
    connect(logger) {
        this.logger = logger;
        return new mongodb_1.MongoClient().connect(this.config.mongo.url)
            .then(db => this.database = db);
    }
    getCollection(collectionName) {
        return this.database.collection(collectionName);
    }
    close() {
        this.logger.info('Closing connection');
    }
};
MongoConnection = __decorate([
    injection_js_1.Injectable(),
    __metadata("design:paramtypes", [Configuration_1.Configuration])
], MongoConnection);
exports.MongoConnection = MongoConnection;
//# sourceMappingURL=MongoConnection.js.map