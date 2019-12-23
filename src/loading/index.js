import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import loadingSvg from './loading.svg'
import './style.scss'

class Loading extends Component {

    static propTypes = {
        className: PropTypes.string,
        message: PropTypes.string,
        show: PropTypes.bool,
        shadow: PropTypes.bool
    }

    static defaultProps = {
        className: '',
        message: '',
        show: false,
        shadow: false
    }

    preventDefault(evt) {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    render() {
        const { className, message, shadow, show } = this.props;
        const cls = classNames('pandaui-loading-box', className, show && 'active');

        return (
            <div className={cls} ref={this.preventDefault}>
                <div className={shadow ? 'box active' : 'box'}>
                    <img src={loadingSvg} alt="加载中..." />
                    {message ? <span className="message">{message}</span> : ''}
                </div>
            </div>
        )
    }
}

export default Loading;