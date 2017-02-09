"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @author AnnatarHe
 * @email iamhele1994@gmail.com
 * @date 2017.02.09
 */

/**
 * {
 *      "event1": [func1, func2]
 * }
 */
var pool = {};

/**
 * {
 *      "event1": [args1, args2]
 *  }
 */
var cache = {};

var isPoolEmpty = function isPoolEmpty() {
    if (Object.keys(pool).length <= 0) {
        return true;
    }
    return false;
};

var on = exports.on = function on(type, listener) {
    // run listener in cache first
    if (cache[type]) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = cache[type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var arg = _step.value;

                listener.apply(undefined, _toConsumableArray(arg));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    // save listener to pool
    if (pool[type]) {
        pool[type].push(listener);
    } else {
        pool[type] = [listener];
    }
};

var emitAndOffBaseFunc = function emitAndOffBaseFunc(func, runFuncWhenEventHasNoneListener) {
    return function (type) {
        var funcs = pool[type];
        if (funcs && funcs.length > 0) {
            func(funcs);
        } else {
            runFuncWhenEventHasNoneListener && runFuncWhenEventHasNoneListener();
        }
    };
};

var emit = exports.emit = function emit(type) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return emitAndOffBaseFunc(function (funcs) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = funcs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var func = _step2.value;

                func.apply(undefined, args);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }, function () {
        if (cache[type]) {
            cache[type].push(args);
        } else {
            cache[type] = [args];
        }
    })(type);
};

var off = exports.off = function off(type, listener) {
    return emitAndOffBaseFunc(function (funcs) {
        if (!listener.name) {
            return;
        }
        for (var index in funcs) {
            if (funcs[index].name === listener.name) {
                pool[type].splice(index, 1);
            }
        }
    })(type);
};