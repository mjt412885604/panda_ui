import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../utils/classnames';
import './style.scss'

/**
 *  Button usage：OK(primary)、Cancel(default)、Warn(warn).
 *
 */
export default class Button extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        fixed: PropTypes.bool,
        height: PropTypes.bool,
        linear: PropTypes.bool,
    }

    static defaultProps = {
        disabled: false,
        loading: false,
        fixed: false,
        height: true,
        linear: true
    }

    render() {
        const { disabled, loading, linear, children, className, fixed, height, ...rest } = this.props
        const cls = classNames('panda-wechat-button', {
            'disabled': disabled || loading,
            'loading': loading,
            'fixed': fixed,
            'linear': linear,
            [className]: className
        })

        return (
            <React.Fragment>
                {fixed && height ? <div style={{ height: 58 }}></div> : ''}
                <button
                    className={cls}
                    disabled={disabled || loading}
                    {...rest}
                >
                    {loading ? <span className="loading-box"><i className="iconfont-pandaui icon-pandauiloading"></i></span> : ''}
                    {children}
                </button>
            </React.Fragment>
        )
    }
};
