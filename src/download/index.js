import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import logo from './logo.png'
import './style.scss'

class Download extends Component {
    static propTypes = {
        className: PropTypes.string,
        action: PropTypes.string,
        text: PropTypes.string,
        logo: PropTypes.string,
        url: PropTypes.string
    }

    static defaultProps = {
        action: '打开',
        text: '熊猫儿科',
        logo: logo,
        url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.pandadoctor.pedi'
    }

    render() {
        const { action, className, text, logo, url, ...reset } = this.props
        const cls = classNames('pandaui-download', className)
        return (
            <>
                <div className="pandaui-download-height"></div>
                <div className={cls} {...reset}>
                    <div className="icon">
                        <img src={logo} alt="熊猫儿科" />
                        {text}
                    </div>
                    <div className="btn">
                        <a href={url}>{action}</a>
                    </div>
                </div>
            </>
        )
    }
}

export default Download