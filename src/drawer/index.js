import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import Mask from '../mask'
import './style.scss'

class Drawer extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
        subTitle: PropTypes.string,
        show: PropTypes.bool,
        scroll: PropTypes.bool,
        buttons: PropTypes.array,
        onCancel: PropTypes.func,
    }

    static defaultProps = {
        className: '',
        title: '',
        subTitle: '',
        show: false,
        scroll: false,
        buttons: [],
        onCancel: () => { }
    }

    componentDidMount() {
        this.setBodyFixed(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setBodyFixed(nextProps)
    }

    componentWillUnmount() {
        this.destoryDialog()
    }

    destoryDialog = () => {
        if (this.props.scroll) {
            document.body.removeAttribute('class')
            document.body.removeAttribute('style')
            this.scrollTop && window.scrollTo(0, this.scrollTop)
        }
    }

    setBodyFixed = ({ show }) => {
        if (this.props.scroll) {
            if (show && document.body.className.indexOf('body-frozen') == -1) {
                this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset // 滚动距离顶部距离
                document.body.className = 'body-frozen'
                document.body.style['top'] = `-${this.scrollTop}px`
            } else {
                this.destoryDialog()
            }
        }
    }

    renderButtons = () => {
        return this.props.buttons.map((action, idx) => {
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

    preventDefault = (evt) => {
        if (evt && !this.props.scroll) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    render() {
        const { className, title, scroll, subTitle, show, buttons, children, onCancel, ...rest } = this.props
        return (
            <CSSTransition
                in={show}
                timeout={300}
                classNames="pandaui-drawer-transition"
                unmountOnExit
            >
                <div ref={this.preventDefault}>
                    <Mask onClick={onCancel} />
                    <div className={classNames('pandaui-drawer', className)} {...rest}>
                        <div className="pandaui-drawer__hd">
                            <div className="pandaui-drawer__hd__side">
                                <button className="pandaui-icon-btn" onClick={onCancel}>关闭</button>
                            </div>
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
                                <div className="pandaui-drawer__ft">{this.renderButtons()}</div>
                                : null
                        }
                    </div>
                </div>
            </CSSTransition>
        )
    }
}

export default Drawer;