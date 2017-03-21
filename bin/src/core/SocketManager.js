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
const socketIO = require("socket.io");
const injection_js_1 = require("injection-js");
let SocketManager = class SocketManager {
    constructor(config) {
        this.config = config;
    }
    listen(logger, server) {
        this.logger = logger;
        this.logger.info('Opening Socket Server');
        this.socketIOServer = socketIO(server);
        this.socketIOServer.on('connection', (socket) => {
            this.logger.debug(`New socket connection on ${socket.client.conn.remoteAddress}`);
        });
    }
    shutdown() {
        this.logger.info('Shutting down');
        this.socketIOServer.close();
    }
};
SocketManager = __decorate([
    injection_js_1.Injectable(),
    __metadata("design:paramtypes", [Configuration_1.Configuration])
], SocketManager);
exports.SocketManager = SocketManager;
//# sourceMappingURL=SocketManager.js.map