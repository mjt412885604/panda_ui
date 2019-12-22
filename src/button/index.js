import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

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
        const cls = classnames('pandaui-button', {
            'disabled': disabled || loading,
            'loading': loading,
            'fixed': fixed,
            'linear': linear,
            [className]: className
        })

        return (
            <>
                {fixed && height ? <div style={{ height: 58 }}></div> : ''}
                <button
                    className={cls}
                    disabled={disabled || loading}
                    {...rest}
                >
                    {loading ? <span className="loading-box"><i className="iconfont-pandaui icon-loading"></i></span> : ''}
                    {children}
                </button>
            </>
        )
    }
};
