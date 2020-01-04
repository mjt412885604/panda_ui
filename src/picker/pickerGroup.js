import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

class PickerGroup extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        items: PropTypes.array,
        offset: PropTypes.number,
        rowHeight: PropTypes.number,
        temp: PropTypes.number,
        bodyHeight: PropTypes.number,
        groupIndex: PropTypes.number,
        onChange: PropTypes.func
    }

    static defaultProps = {
        className: '',
        items: [],
        offset: 2, // 列表初始化时的偏移量（列表初始化时，选项是聚焦在中间的，通过offset强制往上挪3项，以达到初始选项是为顶部的那项）
        rowHeight: 48, // 列表每一行的高度
        temp: null, // translate的缓存
        bodyHeight: 5 * 48,
        groupIndex: 0,
        onChange: () => { }
    }

    start; // 保存开始按下的位置
    end; // 保存结束时的位置
    startTime; // 开始触摸的时间
    translate; // 缓存 translate
    points = []; // 记录移动点

    constructor(props) {
        super(props)
        this.state = {
            translate: {},
            transition: {}
        }
    }

    componentDidMount() {
        this.initDefaultIndex()
        this.content.addEventListener('touchmove', function (e) {
            e.preventDefault()
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.temp != this.props.temp) {
            this.initDefaultIndex(nextProps)
        }
    }

    initDefaultIndex = (props = this.props) => {
        const { temp, items, groupIndex, offset, rowHeight } = props
        if (temp !== null && temp < items.length) {
            const index = temp;
            this.props.onChange.call(this, items[index], index, groupIndex)

            this.translate = (offset - index) * rowHeight
        } else {
            const index = this.getDefaultIndex(items)
            this.props.onChange.call(this, items[index], index, groupIndex)
            this.translate = this.getDefaultTranslate(offset, rowHeight, items)
        }
        this.setState({
            translate: this.setTranslate(this.translate)
        })
    }

    setTransition = (time) => {
        return {
            WebkitTransition: `all ${time}s`,
            transition: `all ${time}s`
        }
    }

    setTranslate = (diff) => {
        return {
            WebkitTransform: `translate3d(0, ${diff}px, 0)`,
            transform: `translate3d(0, ${diff}px, 0)`
        }
    }

    getDefaultIndex = (items) => {
        let current = Math.floor(items.length / 2);
        let count = 0;
        while (!!items[current] && items[current].disabled) {
            current = ++current % items.length;
            count++;

            if (count > items.length) {
                throw new Error('No selectable item.');
            }
        }

        return current;
    }

    getDefaultTranslate = (offset, rowHeight, items) => {
        const currentIndex = this.getDefaultIndex(items);

        return (offset - currentIndex) * rowHeight;
    }

    getMax = (offset, rowHeight) => {
        return offset * rowHeight;
    }

    getMin = (offset, rowHeight, length) => {
        return -(rowHeight * (length - offset - 1));
    }

    stop = (diff) => {
        const { rowHeight, offset, items, groupIndex } = this.props

        this.translate += diff;

        // 移动到最接近的那一行
        this.translate = Math.round(this.translate / rowHeight) * rowHeight;
        const max = this.getMax(offset, rowHeight);
        const min = this.getMin(offset, rowHeight, items.length);
        // 不要超过最大值或者最小值
        if (this.translate > max) {
            this.translate = max;
        }
        if (this.translate < min) {
            this.translate = min;
        }

        // 如果是 disabled 的就跳过
        let index = offset - this.translate / rowHeight;
        while (!!items[index] && items[index].disabled) {
            diff > 0 ? ++index : --index;
        }
        this.translate = (offset - index) * rowHeight;

        this.setState({
            translate: this.setTranslate(this.translate),
            transition: this.setTransition(.3)
        }, () => {
            // 触发选择事件
            this.props.onChange.call(this, items[index], index, groupIndex);
        })
    }

    _start(pageY) {
        this.start = pageY;
        this.startTime = +new Date();
    }

    _move(pageY) {
        this.end = pageY;
        const diff = this.end - this.start;

        this.setState({
            translate: this.setTranslate(this.translate + diff),
            transition: this.setTransition(0)
        })

        this.startTime = +new Date();
        this.points.push({ time: this.startTime, y: this.end });
        if (this.points.length > 40) {
            this.points.shift();
        }
    }

    _end = (pageY, elm) => {
        if (!this.start) return;

        /**
         * 思路:
         * 0. touchstart 记录按下的点和时间
         * 1. touchmove 移动时记录前 40个经过的点和时间
         * 2. touchend 松开手时, 记录该点和时间. 如果松开手时的时间, 距离上一次 move时的时间超过 100ms, 那么认为停止了, 不执行惯性滑动
         *    如果间隔时间在 100ms 内, 查找 100ms 内最近的那个点, 和松开手时的那个点, 计算距离和时间差, 算出速度
         *    速度乘以惯性滑动的时间, 例如 300ms, 计算出应该滑动的距离
         */
        const endTime = new Date().getTime();
        const relativeY = elm.getBoundingClientRect().top + this.props.bodyHeight / 2;
        this.end = pageY;

        // 如果上次时间距离松开手的时间超过 100ms, 则停止了, 没有惯性滑动
        if (endTime - this.startTime > 100) {
            //如果end和start相差小于10，则视为
            if (Math.abs(this.end - this.start) > 10) {
                this.stop(this.end - this.start);
            } else {
                this.stop(relativeY - this.end);
            }
        } else {
            if (Math.abs(this.end - this.start) > 10) {
                const endPos = this.points.length - 1;
                let startPos = endPos;
                for (let i = endPos; i > 0 && this.startTime - this.points[i].time < 100; i--) {
                    startPos = i;
                }

                if (startPos !== endPos) {
                    const ep = this.points[endPos];
                    const sp = this.points[startPos];
                    const t = ep.time - sp.time;
                    const s = ep.y - sp.y;
                    const v = s / t; // 出手时的速度
                    const diff = v * 150 + (this.end - this.start); // 滑行 150ms,这里直接影响“灵敏度”
                    this.stop(diff);
                }
                else {
                    this.stop(0);
                }
            } else {
                this.stop(relativeY - this.end);
            }
        }

        this.start = null;
    }

    handleTouchStart = (evt) => {
        this._start(evt.changedTouches[0].pageY);
    }

    handleTouchMove = (evt) => {
        this._move(evt.changedTouches[0].pageY);
    }

    handleTouchEnd = (evt) => {
        this._end(evt.changedTouches[0].pageY, evt.target);
    }

    pickerGroupItem = () => {
        return this.props.items.map((item, index) => (
            <div
                key={index}
                className={classnames('pandaui-picker__item', item.disabled && 'pandaui-picker__item_disabled')}
            >{typeof item == 'object' ? item.label : item}</div>
        ))
    }

    render() {
        const cls = classnames('pandaui-picker__group', this.props.className)
        const { translate, transition } = this.state

        return (
            <div className={cls}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
                ref={elm => this.content = elm}
            >
                <div className="pandaui-picker__mask"></div>
                <div className="pandaui-picker__indicator"></div>
                <div
                    className="pandaui-picker__content"
                    style={{ ...translate, ...transition }}
                >
                    {
                        this.pickerGroupItem()
                    }
                </div>
            </div>
        )
    }
}

export default PickerGroup;