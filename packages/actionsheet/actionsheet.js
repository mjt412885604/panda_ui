import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../utils/classnames';
import Mask from '../mask/index';
import { CSSTransition } from 'react-transition-group'
import './actionsheet.scss';


class ActionSheet extends Component {
    static propTypes = {
        menus: PropTypes.array,
        type: PropTypes.string,
        title: PropTypes.string,
        cancelText: PropTypes.string,
        onCancel: PropTypes.func,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        type: '',
        title: '',
        menus: [],
        cancelText: '取消',
        onCancel: () => { },
        disabled: false
    }

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
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
        return this.props.menus.map((item, idx) => {
            if (typeof item == 'string') {
                item = { label: item }
            }
            const { label, className, ...rest } = item
            return (
                <div
                    key={idx}
                    className={classNames('weui-actionsheet__cell', className)}
                    onClick={this.selectMenu.bind(null, idx)}
                    {...rest}
                >{label}</div>
            )
        })
    }

    render() {
        const { className, type, title, cancelText, children } = this.props
        const { show } = this.state
        const cls = classNames('active', {
            'weui-actionsheet': true,
            'weui-actionsheet_toggle': show
        });

        let styleType = type ? type : 'ios';

        return (
            <React.Fragment>
                <div className={className} onClick={this.showActionSheet}>{children}</div>
                <CSSTransition
                    in={show}
                    timeout={300}
                    classNames="components-actionsheet"
                    unmountOnExit
                >
                    <div className={styleType === 'android' ? 'weui-skin_android' : ''}>
                        <Mask onClick={this.hideActionSheet} />
                        <div ref={this.preventDefault} className={cls}>
                            {title ? <div className="weui-actionsheet__title">{title}</div> : null}
                            <div className="weui-actionsheet__menu">
                                {this.renderMenus()}
                            </div>
                            <div className="weui-actionsheet__action">
                                {
                                    cancelText ? <div onClick={this.hideActionSheet} className="weui-actionsheet__cell">{cancelText}</div> : null
                                }
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </React.Fragment>
        );
    }
};

export default ActionSheet;
