import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Mask from '../mask'
import './style.scss'

const Drawer = (props) => {
    const { className, title, scroll, subTitle, show, buttons, children, onCancel, ...rest } = props
    const scrollTop = useRef(0)

    useEffect(() => {
        if (scroll && show && document.body.className.indexOf('pandaui-body-frozen') == -1) {
            scrollTop.current = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset // 滚动距离顶部距离
            document.body.className = document.body.className + 'pandaui-body-frozen'
            document.body.style.top = `-${scrollTop.current}px`
        } else {
            destoryDialog()
        }
    }, [show])

    useEffect(() => () => {
        destoryDialog()
    }, [])

    const destoryDialog = () => {
        if (scroll) {
            document.body.className = document.body.className.replace(/pandaui-body-frozen/g, '')
            document.body.style.top = null
            scrollTop.current && window.scrollTo(0, scrollTop.current)
        }
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
            classNames="pandaui-drawer-transition"
            unmountOnExit
        >
            <div ref={preventDefault}>
                <Mask onClick={onCancel} />
                <div className={classNames('pandaui-drawer', className)} {...rest}>
                    <div className="pandaui-drawer__hd">
                        <button className="pandaui-icon-btn" onClick={onCancel}>关闭</button>
                        <div className="pandaui-drawer__hd__main">
                            {
                                title ? <strong className="pandaui-drawer__title">{title}</strong> : null
                            }
                            {
                                subTitle ? <strong className="pandaui-drawer__subtitle">{subTitle}</strong> : null
                            }
                        </div>
                    </div>
                    <div className="pandaui-drawer__bd">{children}</div>
                    {
                        buttons
                            && Array.isArray(buttons)
                            && buttons.length > 0 ?
                            <div className="pandaui-drawer__ft">{renderButtons()}</div>
                            : null
                    }
                </div>
            </div>
        </CSSTransition>
    )
}

Drawer.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    show: PropTypes.bool,
    scroll: PropTypes.bool,
    buttons: PropTypes.array,
    onCancel: PropTypes.func,
}

Drawer.defaultProps = {
    className: '',
    title: '',
    subTitle: '',
    show: false,
    scroll: false,
    buttons: [],
    onCancel: () => { }
}

export default Drawer;