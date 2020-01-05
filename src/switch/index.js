import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Spinner from '../spinner'
import './style.scss'

const Switch = (props) => {
    const { checked, loading, size, activeColor, inActiveColor, className, onChange, style } = props

    const _style = { ...style }
    if (size) {
        _style.fontSize = size
    }
    _style.backgroundColor = checked ? activeColor : inActiveColor;
    _style.borderColor = checked ? activeColor : inActiveColor || 'rgba(0, 0, 0, 0.1)';

    return (
        <div
            className={classnames('pandaui-switch', className, checked && 'checked')}
            onClick={onChange}
            style={_style}
        >
            <div className="pandaui-switch__node">
                {loading ? <Spinner color={checked ? activeColor : inActiveColor || '#c8c9cc'} size={size * 14 / 30} /> : null}
            </div>
        </div>
    )
}

Switch.propTypes = {
    checked: PropTypes.bool,
    loading: PropTypes.bool,
    size: PropTypes.number,
    className: PropTypes.string,
    activeColor: PropTypes.string,
    inActiveColor: PropTypes.string,
    onChange: PropTypes.func,
}

Switch.defaultProps = {
    className: '',
    checked: false,
    loading: false,
    size: 30,
    activeColor: '#13C7CD',
    inActiveColor: '',
    onChange: () => { }
}

export default Switch;