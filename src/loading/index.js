import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import loadingSvg from './loading.svg'
import './style.scss'

class Loading extends Component {
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

Loading.propTypes = {
    message: PropTypes.string,
    show: PropTypes.bool,
    shadow: PropTypes.bool
}

Loading.defaultProps = {
    message: '',
    show: false,
    shadow: false
}

export default Loading;