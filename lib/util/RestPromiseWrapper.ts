export function wrapRestCall<T>(clientOrFunction, name?, url?, method?) {
    var restFunction = clientOrFunction;

    if (name && url && method) {
        clientOrFunction.registerMethod(name, url, method);
        restFunction = clientOrFunction.methods[name];
    }

    return function () : Promise<T> {
        var args = Array.prototype.slice.call(arguments);
        return new Promise((resolve, reject) => {
            args.push((data, response) => {
                resolve(data as T);
            });
            restFunction.apply(this, args).on('error', err => {
                reject(err);
            });
        });
    };
}