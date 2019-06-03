import React, { Component } from 'react'
import classNames from '../utils/classnames';
import PropTypes from 'prop-types'
import './style.scss'


class Download extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    render() {
        const { action, className, text, icon, link, ...reset } = this.props
        const cls = classNames('component-download', className)
        return (
            <div className={cls} {...reset}>
                <div className="icon">
                    <img src={icon} alt="熊猫儿科" />
                    {text}
                </div>
                <div className="btn"><a href="link">{action}</a></div>
            </div>
        )
    }
}

Download.propTypes = {
    action: PropTypes.string,//默认文字类型
    link: PropTypes.string,
    icon: PropTypes.string
}

Download.defaultProps = {
    action: '打开',
    text: '熊猫儿科',
    link: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.pandadoctor.pedi',
    icon: require('./icon.png')
}

export default Download