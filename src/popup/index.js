import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Mask from '../mask'
import './style.scss'

const Popup = (props) => {
    const { className, title, scroll, subTitle, show, buttons, children, onCancel, ...rest } = props

    useEffect(() => {
        if (show && document.body.className.indexOf('pandaui-body-frozen') == -1) {
            document.body.className = document.body.className + ' pandaui-body-frozen'
        } else {
            destoryDialog()
        }
    }, [show])

    useEffect(() => () => {
        destoryDialog()
    }, [])

    const destoryDialog = () => {
        document.body.className = document.body.className.replace(/pandaui-body-frozen/g, '')
    }

    const renderButtons = () => {
        return buttons.map((action, idx) => {
            const { type, label, ...others } = action
            const className = classNames({
                'pandaui-btn': true,
                'pandaui-btn_default': type === 'default',
            })

            return (
                <span key={idx} {...others} className={className}>{label}</span>
            )
        })
    }

    const preventDefault = (evt) => {
        if (evt && !scroll) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="pandaui-popup-transition"
            unmountOnExit
        >
            <div ref={preventDefault}>
                <Mask onClick={onCancel} />
                <div className={classNames('pandaui-popup', className)} {...rest}>
                    <div className="pandaui-popup__hd">
                        <button className="pandaui-icon-btn" onClick={onCancel}>关闭</button>
                        <div className="pandaui-popup__hd__main">
                            {
                                title ? <strong className="pandaui-popup__title">{title}</strong> : null
                            }
                            {
                                subTitle ? <strong className="pandaui-popup__subtitle">{subTitle}</strong> : null
                            }
                        </div>
                    </div>
                    <div className="pandaui-popup__bd">{children}</div>
                    {
                        buttons
                            && Array.isArray(buttons)
                            && buttons.length > 0 ?
                            <div className="pandaui-popup__ft">{renderButtons()}</div>
                            : null
                    }
                </div>
            </div>
        </CSSTransition>
    )
}

Popup.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    show: PropTypes.bool,
    scroll: PropTypes.bool,
    buttons: PropTypes.array,
    onCancel: PropTypes.func,
}

Popup.defaultProps = {
    className: '',
    title: '',
    subTitle: '',
    show: false,
    scroll: false,
    buttons: [],
    onCancel: () => { }
}

export default Popup;