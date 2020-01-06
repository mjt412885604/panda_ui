import React from 'react'
import PropTypes from 'prop-types'
import { throttle } from '../utils/utils'
import './style.scss'

class ImgLazy extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        src: PropTypes.string,
        alt: PropTypes.string,
    }

    static defaultProps = {
        className: '',
        src: '',
        alt: ''
    }

    state = {
        active: false,
        error: false,
        isLoad: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollFunc)
    }

    componentDidUpdate() {
        if (
            this.state.active
            && !this.state.isLoad
            && !this.state.error
        ) {
            if (!this.imgElm) {
                this.imgElm = new Image()
            }

            this.imgElm.src = this.props.src
            this.imgElm.onload = () => {
                this.setState({
                    isLoad: true
                })
            }
            this.imgElm.onerror = () => {
                this.setState({
                    error: true
                })
            }
            window.removeEventListener('scroll', this.scrollFunc)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollFunc)
        this.imgElm = null
    }

    scrollFunc = throttle(() => {
        const isActiveVisible = this.isInVisibleArea(this.img)
        if (isActiveVisible && !this.state.active) {
            this.setState({
                active: true
            })
        }
    })

    isInVisibleArea = (elem) => {
        if (!elem || !elem.getBoundingClientRect) return false;

        const rect = elem.getBoundingClientRect();
        if (
            rect.top < window.innerHeight
            && rect.bottom > 0
            && rect.left < window.innerWidth && rect.right > 0
        ) {
            return true;
        }
        return false;
    }

    render() {
        const { src, className, alt, ...reset } = this.props
        const { error, active, isLoad } = this.state

        if (error || !active || !isLoad) {
            return (
                <div
                    className="pandaui-imgLazy"
                    ref={elm => this.img = elm}
                    {...reset}
                >{error ? '图片加载错误' : '加载中...'}</div>
            )
        }
        return (
            <img src={src} alt={alt} {...reset} />
        )
    }
}

export default ImgLazy;