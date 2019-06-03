import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from '../utils/classnames';
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
        const cls = classNames('component-loading-box', className, show && 'active');

        return (
            <div className={cls} ref={this.preventDefault}>
                <div className={shadow ? 'box active' : 'box'}>
                    <img src={require('./loading.svg')} alt="加载中..." />
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
