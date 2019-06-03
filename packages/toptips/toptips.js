import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types';
import classNames from '../utils/classnames';
import './style.scss'

class Toptips extends Component {
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
        const { className, message, type, willUnmount, ...others } = this.props;
        const cls = classNames({
            'weui-toptips': true,
            [`weui-toptips_${type}`]: true,
            [className]: className
        });
        return (
            <CSSTransition
                in={this.state.visible}
                timeout={300}
                classNames="components-toptips-message"
                unmountOnExit
                onExited={() => willUnmount()}
            >
                <div className="app-toptips" ref={this.preventDefault}>
                    <div className={cls} {...others}>{message}</div>
                </div>
            </CSSTransition>
        )
    }
}

Toptips.propTypes = {
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    willUnmount: PropTypes.func,
    time: PropTypes.number,
    type: PropTypes.string
}

Toptips.defaultProps = {
    time: 2000,
    type: 'warn'
}

export default Toptips;
