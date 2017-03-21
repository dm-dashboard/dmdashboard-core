"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wrapRestCall(clientOrFunction, name, url, method) {
    var restFunction = clientOrFunction;
    if (name && url && method) {
        clientOrFunction.registerMethod(name, url, method);
        restFunction = clientOrFunction.methods[name];
    }
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push((data, response) => {
                resolve(data);
            });
            restFunction.apply(this, args).on('error', err => {
                reject(err);
            });
        });
    };
}
exports.wrapRestCall = wrapRestCall;
//# sourceMappingURL=RestPromiseWrapper.js.map