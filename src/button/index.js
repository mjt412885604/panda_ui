import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

export default class Button extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        loading: PropTypes.bool,
        fixed: PropTypes.bool,
        height: PropTypes.bool,
        linear: PropTypes.bool,
        onClick: PropTypes.func
    }

    static defaultProps = {
        className: '',
        disabled: false,
        loading: false,
        fixed: false,
        height: true,
        linear: true,
        onClick: () => { }
    }

    render() {
        const { disabled, loading, linear, children, className, fixed, height, onClick, ...rest } = this.props
        const cls = classnames('pandaui-button', {
            'disabled': disabled || loading,
            'loading': loading,
            'fixed': fixed,
            'linear': linear,
            [className]: className
        })

        return (
            <>
                {fixed && height ? <div className="pandaui-button-height"></div> : ''}
                <button
                    className={cls}
                    disabled={disabled || loading}
                    onClick={onClick}
                    {...rest}
                >
                    {loading ? <span className="loading-box"><i className="icon-loading"></i></span> : ''}
                    {children}
                </button>
            </>
        )
    }
};
