import React, { useRef } from 'react'
import useDidUpdate from '../utils/useDidUpdate'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Mask from '../mask'
import './style.scss'

class Dialog extends React.Component {

    static propTypes = {
        buttons: PropTypes.array,
        show: PropTypes.bool,
        title: PropTypes.string,
        scrollHeight: PropTypes.number,
        scroll: PropTypes.bool
    }

    static defaultProps = {
        buttons: [],
        show: false,
        title: '',
        scrollHeight: 350,
        scroll: false
    }

    componentWillReceiveProps({ show }) {
        if (show && document.body.className.indexOf('body-frozen') == -1) {
            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            document.body.className = 'body-frozen'
            document.body.style['top'] = `-${this.scrollTop}px`
        } else {
            this.destoryDialog()
        }
    }

    componentWillUnmount() {
        this.destoryDialog()
    }

    destoryDialog = () => {
        document.body.removeAttribute('class')
        document.body.removeAttribute('style')
        this.scrollTop && window.scrollTo(0, this.scrollTop)
    }

    preventDefault = (evt) => {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    contentTouchMove = e => {
        e.stopPropagation()
    }

    renderButtons = () => {
        return this.props.buttons.map((action, idx) => {
            const { type, label, onClick, ...others } = action
            const className = classNames({
                'pandaui-dialog__btn': true,
                'pandaui-dialog__btn_default': type === 'default',
                'pandaui-dialog__btn_primary': type === 'primary'
            })

            return (
                <span key={idx} {...others} onClick={onClick} className={className}>{label}</span>
            )
        })
    }

    render() {
        const { title, show, scroll, scrollHeight, className, children, buttons, ...others } = this.props

        const cls = classNames('pandaui-dialog', {
            [className]: className
        })

        const scrollStyle = scroll ? {
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            maxHeight: scrollHeight
        } : {}

        return (
            <div style={{ display: show ? 'block' : 'none' }}>
                <Mask />
                <div className={cls} {...others} style={{ zIndex: 2000 }}>
                    {title ?
                        <div className="pandaui-dialog__hd" ref={this.preventDefault}>
                            <strong className="pandaui-dialog__title">{title}</strong>
                        </div> : false}
                    <div className="pandaui-dialog__bd" style={scrollStyle} onTouchMove={this.contentTouchMove}>
                        {children}
                    </div>
                    <div className="pandaui-dialog__ft" ref={this.preventDefault}>
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dialog;