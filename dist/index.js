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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJwb29sIiwiY2FjaGUiLCJpc1Bvb2xFbXB0eSIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJvbiIsInR5cGUiLCJsaXN0ZW5lciIsImFyZyIsInB1c2giLCJlbWl0QW5kT2ZmQmFzZUZ1bmMiLCJmdW5jIiwicnVuRnVuY1doZW5FdmVudEhhc05vbmVMaXN0ZW5lciIsImZ1bmNzIiwiZW1pdCIsImFyZ3MiLCJvZmYiLCJuYW1lIiwiaW5kZXgiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7OztBQU1BOzs7OztBQUtBLElBQUlBLE9BQU8sRUFBWDs7QUFFQTs7Ozs7QUFLQSxJQUFJQyxRQUFRLEVBQVo7O0FBRUEsSUFBTUMsY0FBYyxTQUFkQSxXQUFjLEdBQU07QUFDdEIsUUFBSUMsT0FBT0MsSUFBUCxDQUFZSixJQUFaLEVBQWtCSyxNQUFsQixJQUE0QixDQUFoQyxFQUFtQztBQUMvQixlQUFPLElBQVA7QUFDSDtBQUNELFdBQU8sS0FBUDtBQUNILENBTEQ7O0FBT08sSUFBTUMsa0JBQUssU0FBTEEsRUFBSyxDQUFDQyxJQUFELEVBQU9DLFFBQVAsRUFBb0I7QUFDbEM7QUFDQSxRQUFJUCxNQUFNTSxJQUFOLENBQUosRUFBaUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDYixpQ0FBZ0JOLE1BQU1NLElBQU4sQ0FBaEIsOEhBQTZCO0FBQUEsb0JBQXBCRSxHQUFvQjs7QUFDekJELDZEQUFZQyxHQUFaO0FBQ0g7QUFIWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSWhCOztBQUVEO0FBQ0EsUUFBSVQsS0FBS08sSUFBTCxDQUFKLEVBQWdCO0FBQ1pQLGFBQUtPLElBQUwsRUFBV0csSUFBWCxDQUFnQkYsUUFBaEI7QUFDSCxLQUZELE1BRU87QUFDSFIsYUFBS08sSUFBTCxJQUFhLENBQUNDLFFBQUQsQ0FBYjtBQUNIO0FBQ0osQ0FkTTs7QUFnQlAsSUFBTUcscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ0MsSUFBRCxFQUFPQywrQkFBUCxFQUEyQztBQUNsRSxXQUFPLGdCQUFRO0FBQ1gsWUFBTUMsUUFBUWQsS0FBS08sSUFBTCxDQUFkO0FBQ0EsWUFBSU8sU0FBU0EsTUFBTVQsTUFBTixHQUFlLENBQTVCLEVBQStCO0FBQzNCTyxpQkFBS0UsS0FBTDtBQUNILFNBRkQsTUFFTztBQUNIRCwrQ0FBbUNBLGlDQUFuQztBQUNIO0FBQ0osS0FQRDtBQVFILENBVEQ7O0FBV08sSUFBTUUsc0JBQU8sU0FBUEEsSUFBTyxDQUFDUixJQUFEO0FBQUEsc0NBQVVTLElBQVY7QUFBVUEsWUFBVjtBQUFBOztBQUFBLFdBQW1CTCxtQkFBbUIsaUJBQVM7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDL0Qsa0NBQW1CRyxLQUFuQixtSUFBMEI7QUFBQSxvQkFBZkYsSUFBZTs7QUFDdEJBLHNDQUFRSSxJQUFSO0FBQ0g7QUFIOEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlsRSxLQUpzQyxFQUlwQyxZQUFNO0FBQ0wsWUFBSWYsTUFBTU0sSUFBTixDQUFKLEVBQWlCO0FBQ2JOLGtCQUFNTSxJQUFOLEVBQVlHLElBQVosQ0FBaUJNLElBQWpCO0FBQ0gsU0FGRCxNQUVPO0FBQ0hmLGtCQUFNTSxJQUFOLElBQWMsQ0FBQ1MsSUFBRCxDQUFkO0FBQ0g7QUFDSixLQVZzQyxFQVVwQ1QsSUFWb0MsQ0FBbkI7QUFBQSxDQUFiOztBQVlBLElBQU1VLG9CQUFNLFNBQU5BLEdBQU0sQ0FBQ1YsSUFBRCxFQUFPQyxRQUFQO0FBQUEsV0FBb0JHLG1CQUFtQixpQkFBUztBQUMvRCxZQUFJLENBQUVILFNBQVNVLElBQWYsRUFBcUI7QUFDakI7QUFDSDtBQUNELGFBQUssSUFBTUMsS0FBWCxJQUFvQkwsS0FBcEIsRUFBMkI7QUFDdkIsZ0JBQUlBLE1BQU1LLEtBQU4sRUFBYUQsSUFBYixLQUFzQlYsU0FBU1UsSUFBbkMsRUFBeUM7QUFDckNsQixxQkFBS08sSUFBTCxFQUFXYSxNQUFYLENBQWtCRCxLQUFsQixFQUF5QixDQUF6QjtBQUNIO0FBQ0o7QUFDSixLQVRzQyxFQVNwQ1osSUFUb0MsQ0FBcEI7QUFBQSxDQUFaIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAYXV0aG9yIEFubmF0YXJIZVxuICogQGVtYWlsIGlhbWhlbGUxOTk0QGdtYWlsLmNvbVxuICogQGRhdGUgMjAxNy4wMi4wOVxuICovXG5cbi8qKlxuICoge1xuICogICAgICBcImV2ZW50MVwiOiBbZnVuYzEsIGZ1bmMyXVxuICogfVxuICovXG5sZXQgcG9vbCA9IHt9XG5cbi8qKlxuICoge1xuICogICAgICBcImV2ZW50MVwiOiBbYXJnczEsIGFyZ3MyXVxuICogIH1cbiAqL1xubGV0IGNhY2hlID0ge31cblxuY29uc3QgaXNQb29sRW1wdHkgPSAoKSA9PiB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHBvb2wpLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgY29uc3Qgb24gPSAodHlwZSwgbGlzdGVuZXIpID0+IHtcbiAgICAvLyBydW4gbGlzdGVuZXIgaW4gY2FjaGUgZmlyc3RcbiAgICBpZiAoY2FjaGVbdHlwZV0pIHtcbiAgICAgICAgZm9yIChsZXQgYXJnIG9mIGNhY2hlW3R5cGVdKSB7XG4gICAgICAgICAgICBsaXN0ZW5lciguLi5hcmcpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzYXZlIGxpc3RlbmVyIHRvIHBvb2xcbiAgICBpZiAocG9vbFt0eXBlXSkge1xuICAgICAgICBwb29sW3R5cGVdLnB1c2gobGlzdGVuZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcG9vbFt0eXBlXSA9IFtsaXN0ZW5lcl1cbiAgICB9XG59XG5cbmNvbnN0IGVtaXRBbmRPZmZCYXNlRnVuYyA9IChmdW5jLCBydW5GdW5jV2hlbkV2ZW50SGFzTm9uZUxpc3RlbmVyKSA9PiB7XG4gICAgcmV0dXJuIHR5cGUgPT4ge1xuICAgICAgICBjb25zdCBmdW5jcyA9IHBvb2xbdHlwZV1cbiAgICAgICAgaWYgKGZ1bmNzICYmIGZ1bmNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZ1bmMoZnVuY3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBydW5GdW5jV2hlbkV2ZW50SGFzTm9uZUxpc3RlbmVyICYmIHJ1bkZ1bmNXaGVuRXZlbnRIYXNOb25lTGlzdGVuZXIoKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZW1pdCA9ICh0eXBlLCAuLi5hcmdzKSA9PiBlbWl0QW5kT2ZmQmFzZUZ1bmMoZnVuY3MgPT4ge1xuICAgIGZvciAoY29uc3QgZnVuYyBvZiBmdW5jcykge1xuICAgICAgICBmdW5jKC4uLmFyZ3MpXG4gICAgfVxufSwgKCkgPT4ge1xuICAgIGlmIChjYWNoZVt0eXBlXSkge1xuICAgICAgICBjYWNoZVt0eXBlXS5wdXNoKGFyZ3MpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2FjaGVbdHlwZV0gPSBbYXJnc11cbiAgICB9XG59KSh0eXBlKVxuXG5leHBvcnQgY29uc3Qgb2ZmID0gKHR5cGUsIGxpc3RlbmVyKSA9PiBlbWl0QW5kT2ZmQmFzZUZ1bmMoZnVuY3MgPT4ge1xuICAgIGlmICghIGxpc3RlbmVyLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGZvciAoY29uc3QgaW5kZXggaW4gZnVuY3MpIHtcbiAgICAgICAgaWYgKGZ1bmNzW2luZGV4XS5uYW1lID09PSBsaXN0ZW5lci5uYW1lKSB7XG4gICAgICAgICAgICBwb29sW3R5cGVdLnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgfVxuICAgIH1cbn0pKHR5cGUpXG5cbiJdfQ==