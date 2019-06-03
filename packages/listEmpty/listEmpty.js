import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from '../utils/classnames';
import './style.scss'


class ListEmpty extends PureComponent {
    render() {
        const { empty, children, emptyContent, src, text, className, ...rest } = this.props
        return (
            <React.Fragment>
                {
                    empty ?
                        <div className={classNames('panda-list-no-data', className)} {...rest}>
                            {
                                emptyContent ? emptyContent :
                                    <React.Fragment>
                                        <div className="panda-list-no-data-img"><img src={src} /></div>
                                        <div className="panda-list-no-data-text">{text}</div>
                                    </React.Fragment>
                            }
                        </div> : children
                }
            </React.Fragment>
        )
    }
}

ListEmpty.propTypes = {
    empty: PropTypes.bool,
    text: PropTypes.string,
    src: PropTypes.string
}

ListEmpty.defaultProps = {
    empty: false,
    text: '这里暂时还什么都没有，去别处看看吧',
    src: require('./no-data.png')
}

export default ListEmpty;
