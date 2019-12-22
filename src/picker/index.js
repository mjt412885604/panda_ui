import React from 'react'
import PickerGroup from './picker-group'
import classNames from 'classnames'
import { TOP, LINE_HEIGHT } from './constant'
import * as dateHandle from './date'
import './style.scss'

// todos:
// 1. 加入滚动惯性
// 2. shouldComponentUpdate
// 3. 多指操控。。。
// 4. timePicker 样式问题：不在指定时间范围时，选项样式置灰。缩窄两列间宽度。

export default class Picker extends React.Component {
  /** @type {PickerProps} */
  static defaultProps = {
    mode: 'selector'
  }

  constructor(props) {
    super(props)

    this.index = []
    this.handlePrpos()
    this.state = {
      pickerValue: this.index,
      hidden: true,
      fadeOut: false,
      height: []
    }
  }

  handlePrpos(nextProps = this.props) {
    let { value, range, mode } = nextProps

    if (mode === 'multiSelector') {
      if (!range) {
        range = []
        this.props.range = []
      }
      if (range.length === this.index.length) this.index = []
      range.forEach((r, i) => {
        const v = value && value.length ? value[i] : undefined
        this.index.push(this.verifyValue(v, r) ? Math.floor(value[i]) : 0)
      })
    } else if (mode === 'time') {
      // check value...
      if (!this.verifyTime(value)) {
        console.warn('time picker value illegal')
        value = '0:0'
      }
      const time = value.split(':').map(n => +n)
      this.index = time
    } else if (mode === 'date') {
      const { start = '', end = '' } = nextProps

      let _value = dateHandle.verifyDate(value)
      let _start = dateHandle.verifyDate(start)
      let _end = dateHandle.verifyDate(end)

      if (!_value) _value = new Date(new Date().setHours(0, 0, 0, 0)) // 没传值或值的合法性错误默认今天时间
      if (!_start) _start = new Date('1970/01/01')
      if (!_end) _end = new Date('2999/01/01')

      // 时间区间有效性
      if (
        _value.getTime() >= _start.getTime() &&
        _value.getTime() <= _end.getTime()
      ) {
        this.index = [
          _value.getFullYear(),
          _value.getMonth() + 1,
          _value.getDate()
        ]
        if (
          !this.pickerDate ||
          this.pickerDate._value.getTime() !== _value.getTime() ||
          this.pickerDate._start.getTime() !== _start.getTime() ||
          this.pickerDate._end.getTime() !== _end.getTime()
        ) {
          this.pickerDate = {
            _value,
            _start,
            _end,
            _updateValue: [
              _value.getFullYear(),
              _value.getMonth() + 1,
              _value.getDate()
            ]
          }
        }
      } else {
        throw new Error('Date Interval Error')
      }

      // this.index = dateHandle.
    } else {
      if (!range) {
        range = []
        this.props.range = []
      }
      if (this.index.length >= 1) this.index = []
      this.index.push(this.verifyValue(value, range) ? Math.floor(value) : 0)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handlePrpos(nextProps)
  }

  // 校验传入的 value 是否合法
  verifyValue(value, range) {
    if (!isNaN(+value) && value >= 0 && value < range.length) return true
    return false
  }

  // 检验传入的 time value 是否合法
  verifyTime(value) {
    if (!/^\d{1,2}:\d{1,2}$/.test(value)) return false

    const time = value.split(':').map(num => +num)

    if (time[0] < 0 || time[0] > 23) return false
    if (time[1] < 0 || time[1] > 59) return false

    return true
  }

  // 比较时间
  compareTime(t1, t2) {
    // logic: t1 <= t2: return true
    t1 = t1.split(':').map(i => +i)
    t2 = t2.split(':').map(i => +i)

    if (t1[0] < t2[0]) return true
    if (t1[0] === t2[0]) {
      if (t1[1] <= t2[1]) return true
    }

    return false
  }

  getMonthRange(fields = '') {
    let _start = 1
    let _end = 12
    if (this.pickerDate._start.getFullYear() === this.pickerDate._end.getFullYear()) {
      _start = this.pickerDate._start.getMonth() + 1
      _end = this.pickerDate._end.getMonth() + 1
    } else if (this.pickerDate._start.getFullYear() === this.pickerDate._updateValue[0]) {
      _start = this.pickerDate._start.getMonth() + 1
      _end = 12
    } else if (this.pickerDate._end.getFullYear() === this.pickerDate._updateValue[0]) {
      _start = 1
      _end = this.pickerDate._end.getMonth() + 1
    }
    return this.getDateRange(_start, _end, fields)
  }

  getDayRange(fields = '') {
    let _start = 1
    let _end = dateHandle.getMaxDay(this.pickerDate._updateValue[0], this.pickerDate._updateValue[1])
    if (this.pickerDate._start.getFullYear() === this.pickerDate._updateValue[0] && this.pickerDate._start.getMonth() + 1 === this.pickerDate._updateValue[1]) {
      _start = this.pickerDate._start.getDate()
    }
    if (this.pickerDate._end.getFullYear() === this.pickerDate._updateValue[0] && this.pickerDate._end.getMonth() + 1 === this.pickerDate._updateValue[1]) {
      _end = this.pickerDate._end.getDate()
    }
    return this.getDateRange(_start, _end, fields)
  }

  // 获取年月日下标或者下标对应的数
  getDateArrIndex(value, fields, getIdx = false) {
    let year = this.getDateRange(
      this.pickerDate._start.getFullYear(),
      this.pickerDate._end.getFullYear()
    )
    let month = this.getMonthRange()
    let day = this.getDayRange()

    if (getIdx) {
      if (fields === 0) {
        return year[value]
      } else if (fields === 1) {
        return month[value]
      } else {
        return day[value]
      }
    } else {
      if (fields === 0) {
        return year.indexOf(value + '')
      } else if (fields === 1) {
        return month.indexOf(value + '')
      } else {
        return day.indexOf(value + '')
      }
    }
  }

  // 获取时间数组
  getDateRange(begin, end, fields = '') {
    const range = []
    for (let i = begin; i <= end; i++) {
      range.push(`${i}${fields}`)
    }
    return range
  }

  // 隐藏 picker
  hidePicker() {
    this.setState({ fadeOut: true })
    setTimeout(() => this.setState({ hidden: true, fadeOut: false }), 350)
  }

  preventDefault(evt) {
    if (evt) {
      evt.addEventListener('touchmove', function (e) {
        e.preventDefault()
      })
    }
  }

  componentWillUnmount() {
    this.index = []
  }

  render() {
    // 展示 Picker
    const showPicker = () => {
      if (this.props.disabled) return;

      // 组件BUG修复-时间：2019-06-10
      // 时间选择器的时候如果用户波动了时间没有点击确定的时候，下次再次选择时间选择范围将不再是时间范围内
      // 如end = 2019-06-10，然后用户波动时间为2018-03-10但是不点击确定，用户再次打开时间选择器会1~10月
      // 是因为每次渲染时间列表是根据this.pickerDate._updateValue来判断，而此时this.pickerDate._updateValue=[2018, 03, 10]
      if (this.props.mode == 'date') {
        this.pickerDate._updateValue = [...this.index]
      }

      const height = this.index.map((i, idx) => {
        let factor = 0
        if (this.props.mode === 'time') {
          factor = LINE_HEIGHT * 4
        }
        if (this.props.mode === 'date') {
          return TOP - LINE_HEIGHT * this.getDateArrIndex(i * 1, idx) - factor
        }
        return TOP - LINE_HEIGHT * i - factor
      })

      this.setState({
        hidden: false,
        height
      })
    }

    // 点击确定
    const onChange = e => {
      this.hidePicker()

      // 除了 multiSeclector，都在点击确认时才改变记录的下标值
      this.index = this.state.height.map(h => (TOP - h) / LINE_HEIGHT)
      const eventObj = getEventObj(e, 'change', {
        value: this.index.length > 1 && this.props.mode !== 'selector' ? this.index : this.index[0]
      })

      if (this.props.mode === 'time') {
        const range = [
          [
            '20',
            '21',
            '22',
            '23',
            ...getTimeRange(0, 23),
            '00',
            '01',
            '02',
            '03'
          ],
          [
            '56',
            '57',
            '58',
            '59',
            ...getTimeRange(0, 59),
            '00',
            '01',
            '02',
            '03'
          ]
        ]

        this.index = this.index.map((n, i) => range[i][n])
        eventObj.detail.value = this.index.join(':')
      }

      if (this.props.mode === 'date') {
        this.index = this.index.map((n, i) => dateHandle.fullNumber(this.getDateArrIndex(n, i, true)))

        if (this.props.fields === 'year') {
          eventObj.detail.value = [this.index[0]]
        } else if (this.props.fields === 'month') {
          eventObj.detail.value = [this.index[0], this.index[1]]
        } else {
          eventObj.detail.value = this.index
        }
        eventObj.detail.value = eventObj.detail.value.join('-')
      }
      this.setState({
        pickerValue: eventObj.detail.value
      })

      this.props.onChange && this.props.onChange(eventObj)
    }

    // 点击取消或蒙层
    const onCancel = e => {
      this.hidePicker()
      const eventObj = getEventObj(e, 'cancel', {})
      this.props.onCancel && this.props.onCancel(eventObj)
    }

    // 列改变
    const onColumnChange = (height, columnId, e) => {
      // 获取 touchend 时的 index
      const index = this.state.height.map((h, i) => {
        if (columnId === i) h = height
        return (TOP - h) / LINE_HEIGHT
      })

      // 前一级列改变时，后面所有级别的 index 都要设为 0, 并初始化高度
      const rangeLen = this.props.range.length
      if (columnId < rangeLen - 1) {
        for (let i = columnId + 1; i < rangeLen; i++) index[i] = 0
      }
      this.setState({
        height: index.map(i => TOP - i * LINE_HEIGHT)
      })

      // 改变 index 的值
      this.index = index

      const eventObj = getEventObj(e, 'columnChange', {
        column: columnId,
        value: index[columnId]
      })
      this.props.onColumnChange && this.props.onColumnChange(eventObj)
    }

    // 统一抛出的事件对象，和小程序对齐
    const getEventObj = (e, type, detail) => {
      Object.defineProperties(e, {
        detail: {
          value: detail,
          enumerable: true
        },
        type: {
          value: type,
          enumerable: true
        }
      })
      return e
    }

    // 供 PickerGroup 修改对应的 height 值
    const updateHeight = (height, columnId, needRevise = false) => {
      this.setState(
        prevState => {
          prevState.height[columnId] = height
          return { height: prevState.height }
        },
        () => {
          // time picker 必须在规定时间范围内，因此需要在 touchEnd 做修正
          if (needRevise) {
            let { start, end } = this.props

            if (!this.verifyTime(start)) start = '00:00'
            if (!this.verifyTime(end)) end = '23:59'
            if (!this.compareTime(start, end)) return

            let time = this.state.height.map(h => (TOP - h) / LINE_HEIGHT)
            const range = [
              [
                '20',
                '21',
                '22',
                '23',
                ...getTimeRange(0, 23),
                '00',
                '01',
                '02',
                '03'
              ],
              [
                '56',
                '57',
                '58',
                '59',
                ...getTimeRange(0, 59),
                '00',
                '01',
                '02',
                '03'
              ]
            ]
            time = time.map((n, i) => range[i][n]).join(':')

            if (!this.compareTime(start, time)) {
              // 修正到 start
              const height = start
                .split(':')
                .map(i => TOP - LINE_HEIGHT * (+i + 4))
              this.setState({ height })
            } else if (!this.compareTime(time, end)) {
              // 修正到 end
              const height = end
                .split(':')
                .map(i => TOP - LINE_HEIGHT * (+i + 4))
              this.setState({ height })
            }
          }
        }
      )
    }

    // 单列
    const getSelector = () => {
      return (
        <PickerGroup
          range={this.props.range}
          rangeKey={this.props['rangeKey']}
          height={this.state.height[0]}
          updateHeight={updateHeight}
          columnId="0"
        />
      )
    }

    // 多列
    const getMultiSelector = () => {
      return this.props.range.map((range, index) => {
        return (
          <PickerGroup
            range={range}
            rangeKey={this.props['rangeKey']}
            height={this.state.height[index]}
            updateHeight={updateHeight}
            onColumnChange={onColumnChange}
            columnId={index}
            key={index}
          />
        )
      })
    }

    // 时间
    const getTimeSelector = () => {
      const hourRange = [
        '20',
        '21',
        '22',
        '23',
        ...getTimeRange(0, 23),
        '00',
        '01',
        '02',
        '03'
      ]
      const minRange = [
        '56',
        '57',
        '58',
        '59',
        ...getTimeRange(0, 59),
        '00',
        '01',
        '02',
        '03'
      ]
      return [
        <PickerGroup
          mode="time"
          range={hourRange}
          height={this.state.height[0]}
          updateHeight={updateHeight}
          columnId="0"
          key="time-0"
        />,
        <PickerGroup
          mode="time"
          range={minRange}
          height={this.state.height[1]}
          updateHeight={updateHeight}
          columnId="1"
          key="time-1"
        />
      ]
    }

    const getTimeRange = (begin, end) => {
      const range = []
      for (let i = begin; i <= end; i++) {
        range.push(`${i < 10 ? '0' : ''}${i}`)
      }
      return range
    }

    /**
     * @author zhongxin
     * @description 时间选择
     *
     */

    // ======================= Date start =====================//

    const updateDay = (value, fields) => {
      this.pickerDate._updateValue[fields] = value
      // 滚动年份
      if (fields === 0) {
        let monthRange = this.getMonthRange()
        updateDay(monthRange[0] * 1, 1)
        updateHeight(TOP, 1)
      } else if (fields === 1) {
        let dayRange = this.getDayRange()
        updateDay(dayRange[0] * 1, 2)
        updateHeight(TOP, 2)
      }
    }

    const gitDateSelector = () => {
      let year = this.getDateRange(
        this.pickerDate._start.getFullYear(),
        this.pickerDate._end.getFullYear(),
        '年'
      )
      let month = this.getMonthRange('月')
      let day = this.getDayRange('日')
      let renderView = []
      if (this.props.fields === 'year') {
        renderView.push(
          <PickerGroup
            mode="date"
            range={year}
            height={this.state.height[0]}
            updateDay={updateDay}
            updateHeight={updateHeight}
            columnId="0"
            key="year-0"
          />
        )
      } else if (this.props.fields === 'month') {
        renderView.push(
          <PickerGroup
            mode="date"
            range={year}
            height={this.state.height[0]}
            updateDay={updateDay}
            updateHeight={updateHeight}
            columnId="0"
            key="month-0"
          />,
          <PickerGroup
            mode="date"
            range={month}
            height={this.state.height[1]}
            updateDay={updateDay}
            updateHeight={updateHeight}
            columnId="1"
            key="month-1"
          />
        )
      } else {
        renderView = [
          <PickerGroup
            mode="date"
            range={year}
            height={this.state.height[0]}
            updateDay={updateDay}
            updateHeight={updateHeight}
            columnId="0"
            key="year-3-0"
          />,
          <PickerGroup
            mode="date"
            range={month}
            height={this.state.height[1]}
            updateDay={updateDay}
            updateHeight={updateHeight}
            columnId="1"
            key="month-3-1"
          />,
          <PickerGroup
            mode="date"
            range={day}
            updateDay={updateDay}
            height={this.state.height[2]}
            updateHeight={updateHeight}
            columnId="2"
            key="day-3-2"
          />
        ]
      }

      return renderView
    }
    // ======================= Date end =====================//

    // 动画类名控制逻辑
    const clsMask = classNames('pandaui-mask', 'pandaui-animate-fade-in', {
      'pandaui-animate-fade-out': this.state.fadeOut
    })
    const clsSlider = classNames('pandaui-picker', 'pandaui-animate-slide-up', {
      'pandaui-animate-slide-down': this.state.fadeOut
    })
    const shouldDivHidden = { display: this.state.hidden ? 'none' : '' }

    // // 给 children 绑定事件
    // const children = Nerv.Children.map(this.props.children, child => {
    //   return Nerv.cloneElement(child, {
    //     onClick: showPicker
    //   })
    // })

    // picker__group
    let pickerGroup
    switch (this.props.mode) {
      case 'multiSelector':
        pickerGroup = getMultiSelector()
        break
      case 'time':
        pickerGroup = getTimeSelector()
        break
      case 'date':
        pickerGroup = gitDateSelector()
        break
      default:
        pickerGroup = getSelector()
    }

    const { name = '', title } = this.props

    return (
      <div ref={this.preventDefault}>
        <div className={this.props.className} onClick={showPicker}>
          {this.props.children}
        </div>
        <div style={shouldDivHidden} className={clsMask} onClick={onCancel} />
        <div style={shouldDivHidden} className={clsSlider}>
          <div className="pandaui-picker__hd">
            <div className="pandaui-picker__action" onClick={onCancel}>
              取消
            </div>
            {title && <div className="pandaui-picker__title">{title}</div>}
            <div className="pandaui-picker__action" onClick={onChange}>
              确定
            </div>
          </div>
          <div className="pandaui-picker__bd">{pickerGroup}</div>
          <input type="hidden" name={name} value={this.state.pickerValue} />
        </div>
      </div>
    )
  }
}
