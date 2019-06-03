import React from 'react'
import PropTypes from 'prop-types'
import classNames from '../utils/classnames';
import './style.scss'

/**
 * Skeleton
 * @param {bool} active 是否展示动画效果
 * @param {bool} avatar 是否显示头像
 * @param {bool} loading 显示隐藏
 * @param {number} rows 行数
 * 
 * @example
 * <Skeleton
 *  active
 *  avatar
 *  loading={true}
 *  rows={4}
 * />
 */
class Skeleton extends React.Component {
    render() {
        const { rows, avatar, active, loading, children } = this.props
        return (
            <React.Fragment>
                {
                    loading ?
                        <div className={classNames('components-skeleton', active && 'animation')}>
                            {avatar && <div className="avatar-box"><span className="avatar"></span></div>}
                            <div className="list-box">
                                <div className="list" style={{ width: '50%' }}></div>
                                <div style={{ marginTop: 25 }}>
                                    {
                                        [...Array(+rows)].map((item, index) => (
                                            <div className="list" key={index}></div>
                                        ))
                                    }
                                </div>
                                <div className="list" style={{ width: '61%' }}></div>
                            </div>
                        </div> : children
                }
            </React.Fragment>
        )
    }
}

Skeleton.propTypes = {
    active: PropTypes.bool,
    avatar: PropTypes.bool,
    loading: PropTypes.bool,
    rows: PropTypes.number
}

Skeleton.defaultProps = {
    active: false,
    avatar: false,
    loading: false,
    rows: 2
}
export default Skeleton;