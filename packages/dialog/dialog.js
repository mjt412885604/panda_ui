import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from '../utils/classnames';
import Mask from '../mask';

/**
 * Modals provide feedback to user
 *
 */
class Dialog extends Component {
    static propTypes = {
        buttons: PropTypes.array,
        show: PropTypes.bool,
        title: PropTypes.string,
        type: PropTypes.string,
        scrollHeight: PropTypes.number,
        scroll: PropTypes.bool
    };

    static defaultProps = {
        buttons: [],
        show: false,
        title: '',
        type: '',
        scrollHeight: 350,
        scroll: false
    };

    constructor(props) {
        super(props);

        this.state = {
            isAndroid: ''
        };
    }

    renderButtons() {
        return this.props.buttons.map((action, idx) => {
            const { type, label, ...others } = action;
            const className = classNames({
                'weui-dialog__btn': true,
                'weui-dialog__btn_default': type === 'default',
                'weui-dialog__btn_primary': type === 'primary'
            });

            return (
                <a key={idx} href="javascript:;" {...others} className={className}>{label}</a>
            );
        });
    }

    contentTouchMove = e => {
        e.stopPropagation()
        return false
    }

    render() {
        const { title, show, scroll, scrollHeight, className, children, buttons, type, autoDectect, ...others } = this.props;
        const styleType = type ? type : 'ios';
        const cls = classNames('weui-dialog', {
            'weui-skin_android': styleType === 'android',
            [className]: className
        })
        const scrollStyle = scroll ? {
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            maxHeight: scrollHeight
        } : {}

        return (
            <div style={{ display: show ? 'block' : 'none'}}>
                <Mask />
                <div ref={this.preventDefault} className={cls} {...others} style={{zIndex: 2000}}>
                    {title ?
                        <div className="weui-dialog__hd">
                            <strong className="weui-dialog__title">{title}</strong>
                        </div> : false}
                    <div className="weui-dialog__bd" style={scrollStyle} onTouchMove={this.contentTouchMove}>
                        {children}
                    </div>
                    <div className="weui-dialog__ft">
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dialog;
