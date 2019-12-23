import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

class Avatar extends Component {

    static propTypes = {
        className: PropTypes.string,
        size: PropTypes.number,
        style: PropTypes.object,
        icon: PropTypes.string,
        vip: PropTypes.bool,
        img: PropTypes.bool,
    }

    static defaultProps = {
        className: '',
        size: 40,
        style: {},
        icon: 'default',
        vip: false,
        img: false
    }

    render() {
        const { size, icon, className, vip, img, ...rest } = this.props
        const isPicture = /^http/.test(icon) || /^data:image\/(\/?[^>]*);base64/.test(icon)
        const cls = classnames('pandaui-avatar', className, {
            default: !isPicture && !img,
            vip: vip
        })
        const sty = {
            width: size,
            minHeight: size,
        }

        if (isPicture && !img) {
            sty['background'] = `url(${icon}) center center/cover no-repeat`
        }
        return (
            <div className={cls} style={sty}>
                <i {...rest}>
                    {img ? <img src={icon} /> : ''}
                </i>
            </div>
        )
    }
}

export default Avatar;
