export const dateFormat = (date = new Date()) => {
    date = typeof date == 'string' ? date.replace(/-/g, '/') : date

    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth() + 1
    const day = new Date(date).getDate()

    return [year, month, day]
}

export const fullNumber = (number) => number < 10 ? `0${number}` : number

export const getMaxDay = (year, month) => {
    if ([4, 6, 9, 11].indexOf(+month) > -1) {
        return 30
    }

    if (month == 2) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            return 29
        }
        return 28
    }

    return 31
}

const setMonths = (options, type) => {
    const [year, month, date] = options
    const arr = []

    if (type == 0) { // 起始时间
        for (let i = month; i <= 12; i++) {
            const dayArr = Array(getMaxDay(year, i)).keys()
            arr.push({
                label: i + '月',
                value: fullNumber(i),
                children: [...dayArr]
                    .filter(v => i == month ? (v + 1) >= date : true)
                    .map(v => ({
                        label: v + 1 + '日',
                        value: fullNumber(v + 1)
                    }))
            })
        }
    } else if (type == 1) { // 结束时间
        for (let i = 1; i <= month; i++) {
            const dayArr = Array(getMaxDay(year, i)).keys()
            arr.push({
                label: i + '月',
                value: fullNumber(i),
                children: [...dayArr]
                    .filter(v => i == month ? (v + 1) <= date : true)
                    .map(v => ({
                        label: v + 1 + '日',
                        value: fullNumber(v + 1)
                    }))
            })
        }
    } else {
        for (let i = 1; i <= 12; i++) {
            const dayArr = Array(getMaxDay(year, i)).keys()
            arr.push({
                label: i + '月',
                value: fullNumber(i),
                children: [...dayArr].map(v => ({
                    label: v + 1 + '日',
                    value: fullNumber(v + 1)
                }))
            })
        }
    }

    return arr
}

export const initPickerData = (options) => {
    const { start, end } = Object.assign({}, {
        start: dateFormat(new Date().setFullYear(dateFormat()[0] - 1)).join('-'),
        end: dateFormat().join('-')
    }, options)

    const baseStartDate = dateFormat(start)
    const baseEndDate = dateFormat(end)

    const satrtDate = [{
        label: baseStartDate[0] + '年',
        value: baseStartDate[0],
        children: setMonths(baseStartDate, 0)
    }]

    const endDate = [{
        label: baseEndDate[0] + '年',
        value: baseEndDate[0],
        children: setMonths(baseEndDate, 1)
    }]

    const middleDate = []
    for (let i = baseStartDate[0] + 1; i < baseEndDate[0]; i++) {
        middleDate.push({
            label: i + '年',
            value: String(i),
            children: setMonths([i], 2)
        })
    }

    return satrtDate.concat(middleDate).concat(endDate)
}