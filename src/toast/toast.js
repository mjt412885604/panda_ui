import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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

    maskClick = () => {
        this.timeout && clearTimeout(this.timeout);
        this.setState({
            visible: false
        })
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
            <div className="pandaui-toast" ref={this.preventDefault} onClick={this.maskClick}>
                <CSSTransition
                    in={this.state.visible}
                    timeout={200}
                    classNames="pandaui-toast-message"
                    unmountOnExit
                    onExited={() => willUnmount()}
                >
                    <div className={cls} {...others}>
                        {type ? <div className="icons"></div> : ''}
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