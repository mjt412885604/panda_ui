import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

const CheckBox = (props) => {
    const { checked, disabled, type, onChange, className, children, ...rest } = props

    const onCheckboxChange = () => {
        if (!disabled) {
            onChange()
        }
    }

    return (
        <span
            className={classnames(
                'pandaui-checkbox',
                className,
                checked && 'checked',
                disabled && 'disabled',
                type == 'round' && 'round'
            )}
            onClick={onCheckboxChange}
        >
            <span className="pandaui-checkbox__content" {...rest}>
                <svg viewBox="0 0 1024 1024" className="check">
                    <path d="M941.8 204.7c-25.3-26.9-66.6-27.4-92.5-1.1L403.8 656.7 173.8 417c-23.9-24.9-63.9-23.5-89.5 3.1s-26.9 68.3-3 93.3l281.2 293c23.9 24.9 63.9 23.5 89.5-3.1 5.9-6.1 10.2-13 13.5-20.3 2.5-1.9 5.1-3.7 7.3-6.1L940.7 301c25.8-26.3 26.3-69.4 1.1-96.3z"></path>
                </svg>
            </span>
            {children ? <span className="pandaui-checkbox__text">{children}</span> : null}
        </span>
    )
}

CheckBox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    type: PropTypes.string,
}

CheckBox.defaultProps = {
    className: '',
    checked: false,
    disabled: false,
    onChange: () => { },
    type: 'square'
}

export default CheckBox;