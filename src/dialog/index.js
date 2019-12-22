import React, { useRef } from 'react'
import useDidUpdate from '../utils/useDidUpdate'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Mask from '../mask'
import './style.scss'

const Dialog = (props) => {
    const { title, show, scroll, scrollHeight, className, children, buttons, type, ...others } = props
    const scrollTop = useRef(0)

    const cls = classNames('pandaui-dialog', {
        [className]: className
    })

    const scrollStyle = scroll ? {
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        maxHeight: scrollHeight
    } : {}

    const destoryDialog = () => {
        document.body.removeAttribute('class')
        document.body.removeAttribute('style')
        scrollTop.current && window.scrollTo(0, scrollTop.current)
    }

    useDidUpdate(() => {
        if (show) {
            scrollTop.current = document.body.scrollTop || document.documentElement.scrollTop
            document.body.className = 'body-frozen'
            document.body.style['top'] = `-${scrollTop.current}px`
        } else {
            destoryDialog()
        }
        return () => {
            destoryDialog()
        }
    }, [show])

    const preventDefault = (evt) => {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    const contentTouchMove = e => {
        e.stopPropagation()
    }

    const renderButtons = () => {
        return props.buttons.map((action, idx) => {
            const { type, label, ...others } = action
            const className = classNames({
                'pandaui-dialog__btn': true,
                'pandaui-dialog__btn_default': type === 'default',
                'pandaui-dialog__btn_primary': type === 'primary'
            });

            return (
                <span key={idx} {...others} className={className}>{label}</span>
            )
        })
    }

    return (
        <div style={{ display: show ? 'block' : 'none' }}>
            <Mask />
            <div className={cls} {...others} style={{ zIndex: 2000 }}>
                {title ?
                    <div className="pandaui-dialog__hd" ref={preventDefault}>
                        <strong className="pandaui-dialog__title">{title}</strong>
                    </div> : false}
                <div className="pandaui-dialog__bd" style={scrollStyle} onTouchMove={contentTouchMove}>
                    {children}
                </div>
                <div className="pandaui-dialog__ft" ref={preventDefault}>
                    {renderButtons()}
                </div>
            </div>
        </div>
    );
}

Dialog.propTypes = {
    buttons: PropTypes.array,
    show: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.string,
    scrollHeight: PropTypes.number,
    scroll: PropTypes.bool
}

Dialog.defaultProps = {
    buttons: [],
    show: false,
    title: '',
    type: '',
    scrollHeight: 350,
    scroll: false
}

export default Dialog;