import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

class Scroll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.isScroll = false
    }

    /**
     * 滚动截流
     * @param {*} fn 
     * @param {*} delay 
     */
    throttle = (fn, delay) => {
        let timer = null
        return function () {
            clearTimeout(timer)
            timer = setTimeout(function () {
                fn()
            }, delay)
        }
    }

    onscroll = () => {
        const Height = document.body.clientHeight // body体高度
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset // 滚动距离顶部距离
        const scrollHeight = document.documentElement.clientHeight + scrollTop // 窗口滚动高度
        const { distance, onScrollToEnd, data } = this.props

        if (Height < (scrollHeight + distance) && !this.isScroll && data.length > 0) { // 加载更多
            this.isScroll = true
            onScrollToEnd && onScrollToEnd()
        }
    }

    onWindowOnScrollInit = () => {
        window.onscroll = this.throttle(this.onscroll, this.props.throttle)
    }

    componentDidMount() {
        this.onWindowOnScrollInit()
    }

    componentWillReceiveProps(prev) {
        this.isScroll = prev.loadMore
    }

    componentWillUnmount() {
        window.onscroll = null
    }

    render() {
        const { className, children, loadText, loadMore, onScrollToEnd, data, ...rest } = this.props
        const cls = classnames('pandaui-component-scroll', className)

        return (
            <div className={cls} {...rest}>
                {children}
                <div className="load-more">{!loadMore ? '加载中, 请稍等...' : loadText}</div>
            </div>
        )
    }
}

Scroll.propTypes = {
    loadMore: PropTypes.bool,
    loadText: PropTypes.string,
    distance: PropTypes.number,
    data: PropTypes.array,
    throttle: PropTypes.number
}

Scroll.defaultProps = {
    loadMore: false,
    loadText: '已经加载全部数据',
    distance: 100,
    data: [],
    throttle: 150
}

export default Scroll;