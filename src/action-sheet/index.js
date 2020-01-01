import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Mask from '../mask'
import { CSSTransition } from 'react-transition-group'
import './style.scss'

class ActionSheet extends Component {
    static propTypes = {
        className: PropTypes.string,
        title: PropTypes.string,
        menus: PropTypes.array,
        cancelText: PropTypes.string,
        disabled: PropTypes.bool,
        onCancel: PropTypes.func,
        onChange: PropTypes.func
    }

    static defaultProps = {
        className: '',
        title: '',
        menus: [],
        cancelText: '取消',
        disabled: false,
        onCancel: () => { },
        onChange: () => { }
    }

    state = {
        show: false
    }

    preventDefault(evt) {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    selectMenu = index => {
        this.hideActionSheet(false)
        this.props.onChange && this.props.onChange(index)
    }

    showActionSheet = () => {
        if (!this.props.disabled) {
            this.setState({ show: true })
        }
    }

    hideActionSheet = (isCancel = true) => {
        this.setState({
            show: false
        })
        isCancel && this.props.onCancel()
    }

    renderMenus = () => {
        return this.props.menus
            .filter(Boolean)
            .map((item, idx) => {
                if (typeof item == 'string' || typeof item == 'number') {
                    item = { label: item }
                }
                const { label, className, ...rest } = item
                return (
                    <div
                        key={idx}
                        className={classNames('pandaui-actionsheet__cell', className)}
                        onClick={this.selectMenu.bind(null, idx)}
                        {...rest}
                    >{label}</div>
                )
            })
    }

    render() {
        const { className, title, cancelText, children } = this.props
        const { show } = this.state
        const cls = classNames('active', {
            'pandaui-actionsheet': true,
            'pandaui-actionsheet_toggle': show
        })

        return (
            <>
                <div className={className} onClick={this.showActionSheet}>{children}</div>
                <CSSTransition
                    in={show}
                    timeout={300}
                    classNames="pandaui-actionSheet-transition"
                    unmountOnExit
                >
                    <div>
                        <Mask onClick={this.hideActionSheet} />
                        <div ref={this.preventDefault} className={cls}>
                            {title ? <div className="pandaui-actionsheet__title">{title}</div> : null}
                            <div className="pandaui-actionsheet__menu">
                                {this.renderMenus()}
                            </div>
                            <div className="pandaui-actionsheet__action">
                                {
                                    cancelText ? <div onClick={this.hideActionSheet} className="pandaui-actionsheet__cell">{cancelText}</div> : null
                                }
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </>
        );
    }
};

export default ActionSheet;