import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types';
import classNames from '../utils/classnames';
import Icon from '../icon'
import './style.scss'

class Toast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.setState({
            visible: true
        }, () => {
            this.startTimer();
        })
    }

    componentWillUnmount() {
        this.timeout && clearTimeout(this.timeout);
    }

    startTimer = () => {
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);

            this.setState({
                visible: false
            });
        }, this.props.time)
    }

    preventDefault(evt) {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    render() {
        const { className, message, type, iconSize, willUnmount, callback, ...others } = this.props;
        const cls = classNames({
            'message': true,
            [className]: className
        })
        return (
            <div className="app-toast" ref={this.preventDefault}>
                <CSSTransition
                    in={this.state.visible}
                    timeout={200}
                    classNames="components-toast-message"
                    unmountOnExit
                    onExited={() => willUnmount()}
                >
                    <div className={cls} {...others}>
                        {type ? <div className="icons"><Icon value={type} size={iconSize} className="weui-icon_toast" /></div> : ''}
                        {message}
                    </div>
                </CSSTransition>
            </div>
        )
    }
}

Toast.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    willUnmount: PropTypes.func,
    time: PropTypes.number,
    type: PropTypes.string
}

Toast.defaultProps = {
    time: 2000,
    type: null
}

export default Toast;
