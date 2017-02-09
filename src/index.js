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
let pool = {}

/**
 * {
 *      "event1": [args1, args2]
 *  }
 */
let cache = {}

const isPoolEmpty = () => {
    if (Object.keys(pool).length <= 0) {
        return true
    }
    return false
}

export const on = (type, listener) => {
    // run listener in cache first
    if (cache[type]) {
        for (let arg of cache[type]) {
            listener(...arg)
        }
    }

    // save listener to pool
    if (pool[type]) {
        pool[type].push(listener)
    } else {
        pool[type] = [listener]
    }
}

const emitAndOffBaseFunc = (func, runFuncWhenEventHasNoneListener) => {
    return type => {
        const funcs = pool[type]
        if (funcs && funcs.length > 0) {
            func(funcs)
        } else {
            runFuncWhenEventHasNoneListener && runFuncWhenEventHasNoneListener()
        }
    }
}

export const emit = (type, ...args) => emitAndOffBaseFunc(funcs => {
    for (const func of funcs) {
        func(...args)
    }
}, () => {
    if (cache[type]) {
        cache[type].push(args)
    } else {
        cache[type] = [args]
    }
})(type)

export const off = (type, listener) => emitAndOffBaseFunc(funcs => {
    if (! listener.name) {
        return
    }
    for (const index in funcs) {
        if (funcs[index].name === listener.name) {
            pool[type].splice(index, 1)
        }
    }
})(type)

