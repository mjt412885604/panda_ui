import React, { useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Mask from '../mask'
import './style.scss'

const Dialog = (props) => {
    const { title, show, scroll, scrollHeight, className, children, buttons, ...others } = props
    const maxWindowHeight = document.documentElement.clientHeight * 0.9 - 150

    useEffect(() => () => {
        destoryDialog()
    }, [])

    useEffect(() => {
        if (show && scroll && document.body.className.indexOf('pandaui-body-frozen') == -1) {
            document.body.className = document.body.className + 'pandaui-body-frozen'
        } else {
            destoryDialog()
        }
    }, [show])

    const destoryDialog = () => {
        if (document.body.className.indexOf('pandaui-body-frozen') > -1) {
            document.body.className = document.body.className.replace(/pandaui-body-frozen/g, '')
        }
    }

    const preventDefault = (evt) => {
        if (!scroll && evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    const renderButtons = () => {
        return props.buttons.map((action, idx) => {
            const { type, label, ...others } = action
            const className = classNames({
                'pandaui-dialog__btn': true,
                'pandaui-dialog__btn_default': type === 'default',
                'pandaui-dialog__btn_primary': type === 'primary'
            })

            return (
                <span key={idx} {...others} className={className}>{label}</span>
            )
        })
    }

    const scrollStyle = scrollHeight ? {
        maxHeight: maxWindowHeight > scrollHeight ? scrollHeight : maxWindowHeight
    } : {}

    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="pandaui-dialog-transition"
            unmountOnExit
        >
            <div>
                <Mask />
                <div
                    className={classNames('pandaui-dialog', className)}
                    ref={preventDefault}
                    {...others}
                >
                    {
                        title ?
                            <div className="pandaui-dialog__hd">
                                <strong className="pandaui-dialog__title">{title}</strong>
                            </div> : null
                    }
                    <div className="pandaui-dialog__bd" style={scrollStyle}>
                        {children}
                    </div>
                    <div className="pandaui-dialog__ft">
                        {renderButtons()}
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}

Dialog.propTypes = {
    buttons: PropTypes.array,
    show: PropTypes.bool,
    title: PropTypes.string,
    scrollHeight: PropTypes.number,
    scroll: PropTypes.bool
}

Dialog.defaultProps = {
    buttons: [],
    show: false,
    title: '',
    scrollHeight: 350,
    scroll: false
}

export default Dialog;