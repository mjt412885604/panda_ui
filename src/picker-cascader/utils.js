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