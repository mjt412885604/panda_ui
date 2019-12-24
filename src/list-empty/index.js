import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import noData from './no-data.png'
import './style.scss'


class ListEmpty extends Component {

    static propTypes = {
        className: PropTypes.string,
        empty: PropTypes.bool,
        show: PropTypes.bool,
        text: PropTypes.string,
        src: PropTypes.string
    }

    static defaultProps = {
        className: '',
        empty: false,
        show: false,
        text: '这里暂时还什么都没有，去别处看看吧',
        src: noData
    }

    render() {
        const { show, empty, children, emptyContent, src, text, className, ...rest } = this.props
        return (
            <>
                {
                    (show || empty) ?
                        <div className={classnames('pandaui-list-no-data', className)} {...rest}>
                            {
                                emptyContent ? emptyContent :
                                    <>
                                        <div className="pandaui-list-no-data-img"><img src={src} /></div>
                                        <div className="pandaui-list-no-data-text">{text}</div>
                                    </>
                            }
                        </div> : children
                }
            </>
        )
    }
}

export default ListEmpty;