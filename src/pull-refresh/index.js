import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Spinner from '../spinner'
import './style.scss'

const TEXT_STATUS = ['pulling', 'loosing', 'success']

class PullRefresh extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        pullingText: PropTypes.string,
        loosingText: PropTypes.string,
        loadingText: PropTypes.string,
        headHeight: PropTypes.number,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        onRefresh: PropTypes.func
    }

    static defaultProps = {
        className: '',
        pullingText: '下拉即可刷新',
        loosingText: '释放即可刷新',
        loadingText: '加载中...',
        headHeight: 50,
        disabled: false,
        loading: false,
        onRefresh: () => { }
    }

    state = {
        status: 'normal',
        distance: 0,
    }

    duration = 0

    componentDidMount() {
        this.scrollEl.addEventListener('touchstart', this.onTouchStart)
        this.scrollEl.addEventListener('touchmove', this.onTouchMove)
        this.scrollEl.addEventListener('touchend', this.onTouchEnd)
        this.scrollEl.addEventListener('touchcancel', this.onTouchEnd)
        this.isLoading = this.props.loading
        this.initRefreshStatus()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading != this.props.loading) {
            this.isLoading = nextProps.loading
            this.initRefreshStatus()
        }
    }

    componentWillUnmount() {
        this.scrollEl.removeEventListener('touchstart', this.onTouchStart)
        this.scrollEl.removeEventListener('touchmove', this.onTouchMove)
        this.scrollEl.removeEventListener('touchend', this.onTouchEnd)
        this.scrollEl.removeEventListener('touchcancel', this.onTouchEnd)
    }

    initRefreshStatus = () => {
        this.duration = 300
        if (this.isLoading) {
            this.setStatus(this.props.headHeight, true);
        } else {
            this.setStatus(0, false);
        }
    }

    getDirection = (x, y) => {
        const MIN_DISTANCE = 10;

        if (x > y && x > MIN_DISTANCE) {
            return 'horizontal';
        }

        if (y > x && y > MIN_DISTANCE) {
            return 'vertical';
        }

        return '';
    }

    resetTouchStatus() {
        this.direction = ''
        this.deltaX = 0
        this.deltaY = 0
        this.offsetX = 0
        this.offsetY = 0
    }

    touchable = () => {
        const { status } = this.state
        return status != 'loading' && status != 'success' && !this.props.disabled
    }

    checkPullStart = (event) => {
        this.ceiling = document.body.getBoundingClientRect().top == 0
        if (this.ceiling) {
            this.duration = 0
            this.startX = event.touches[0].clientX
            this.startY = event.touches[0].clientY
        }
    }

    touchMove = (event) => {
        this.ceiling = document.body.getBoundingClientRect().top == 0

        const touch = event.touches[0]
        this.deltaX = touch.clientX - this.startX
        this.deltaY = touch.clientY - this.startY
        this.offsetX = Math.abs(this.deltaX)
        this.offsetY = Math.abs(this.deltaY)
        this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
    }

    onTouchStart = (event) => {
        if (this.touchable()) {
            this.resetTouchStatus()
            this.checkPullStart(event)
        }
    }

    onTouchMove = (event) => {
        if (this.touchable() && this.ceiling) {
            this.touchMove(event)
            if (this.ceiling && this.deltaY >= 0 && this.direction === 'vertical') {
                if (typeof event.cancelable !== 'boolean' || event.cancelable) {
                    event.preventDefault()
                }
                this.setStatus(this.ease(this.deltaY))
            }
        }
    }

    onTouchEnd = () => {
        if (this.touchable() && this.ceiling && this.deltaY) {
            this.duration = 300
            this.ceiling = false

            if (this.state.status === 'loosing') {
                this.setStatus(this.props.headHeight, true);
                this.props.onRefresh(this.onClose)
            } else {
                this.setStatus(0)
            }
        }
    }

    onClose = () => {
        this.isLoading = false
        this.initRefreshStatus()
    }

    ease = (distance) => {
        const { headHeight } = this.props

        if (distance > headHeight) {
            if (distance < headHeight * 2) {
                distance = headHeight + (distance - headHeight) / 2;
            } else {
                distance = headHeight * 1.5 + (distance - headHeight * 2) / 4;
            }
        }

        return Math.round(distance)
    }

    getStatus = () => {
        const { status } = this.state
        const text = this.props[`${status}Text`]

        if (TEXT_STATUS.indexOf(status) > -1 && text) {
            return (
                <div className="pandaui-pullrefresh__text">{text}</div>
            )
        }

        if (status === 'loading') {
            return (
                <Spinner size={16}>{text}</Spinner>
            )
        }
    }

    setStatus(distance, isLoading) {
        const info = {};
        let status;
        if (isLoading) {
            status = 'loading';
        } else if (distance === 0) {
            status = 'normal';
        } else {
            status = distance < this.props.headHeight ? 'pulling' : 'loosing';
        }

        info['distance'] = distance
        if (status !== this.state.status) {
            info['status'] = status
        }
        this.setState(info)
    }

    render() {
        const { distance } = this.state
        const { className, children, style } = this.props
        const _style = {
            ...style,
            transitionDuration: `${this.duration}ms`,
            WebkitTransform: distance ? `translate3d(0,${distance}px, 0)` : '',
            transform: distance ? `translate3d(0,${distance}px, 0)` : '',
        }

        return (
            <div
                className={classNames('pandaui-pullrefresh', className)}
                ref={elm => this.scrollEl = elm}
                style={_style}
            >
                <div
                    className="pandaui-pullrefresh__head"
                    style={{
                        height: this.props.headHeight,
                        top: - this.props.headHeight
                    }}
                >{this.getStatus()}</div>
                {children}
            </div>
        )
    }
}

export default PullRefresh;