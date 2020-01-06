import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

const Spinner = (props) => {
    const { color, size, type, className, style, vertical, children } = props

    const _style = { ...style, color }
    if (size) {
        _style.width = size
        _style.height = size
    }

    const loadingIcon = () => {
        if (type == 'spinner') {
            return [...Array(12)].map((item, index) => <i key={index}></i>)
        }
        return (
            <svg className="circular" viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20" fill="none" />
            </svg>
        )
    }

    return (
        <div className={classnames('pandaui-spinner', vertical && 'vertical', className)}>
            <span className={"pandaui-spinner__" + type} style={_style}>
                {loadingIcon()}
            </span>
            {children ? <span className="pandaui-spinner__text">{children}</span> : null}
        </div>
    )
}

Spinner.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    vertical: PropTypes.bool,
}

Spinner.defaultProps = {
    size: 24,
    color: '#c8c9cc',
    className: '',
    type: 'circle',
    vertical: false
}

export default Spinner;