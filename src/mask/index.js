import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.scss'

class Mask extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        transparent: PropTypes.bool,
        onClick: PropTypes.func
    }

    static defaultProps = {
        className: '',
        transparent: false,
        onClick: () => { }
    }

    preventDefault(evt) {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    render() {
        const { transparent, className, onClick, ...others } = this.props;
        const clz = classNames({
            'pandaui-mask': !transparent,
            'pandaui-mask_transparent': transparent
        }, className)

        return (
            <div ref={this.preventDefault} onClick={onClick} className={clz} {...others}></div>
        )
    }
}

export default Mask;
