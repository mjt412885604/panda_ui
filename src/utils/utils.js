export const isObject = obj => {
    if (!obj) {
        return false;
    }
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export const isArray = array => {
    if (!array) {
        return false;
    }
    return Object.prototype.toString.call(array) === '[object Array]'
}

export const throttle = (fn = () => { }, delay = 200) => {
    let timer = null
    let startTime = +new Date()
    return function (...args) {
        const curTime = +new Date()
        const remaining = delay - (curTime - startTime)

        timer && clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(this, args)
            startTime = +new Date()
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, remaining)
        }
    }
}