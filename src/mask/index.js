import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.scss'

class Mask extends React.Component {
    static propTypes = {
        transparent: PropTypes.bool
    }

    static defaultProps = {
        transparent: false
    }

    preventDefault(evt) {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    render() {
        const { transparent, className, ...others } = this.props;
        const clz = classNames({
            'pandaui-mask': !transparent,
            'pandaui-mask_transparent': transparent
        }, className)

        return (
            <div ref={this.preventDefault} className={clz} {...others}></div>
        )
    }
}

export default Mask;
