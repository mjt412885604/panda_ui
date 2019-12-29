import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PickerGroup from './picker_group'
import classNames from 'classnames'
import Mask from '../mask'
import './style.scss'

class Picker extends Component {
    static propTypes = {
        groups: PropTypes.array,
        defaultSelect: PropTypes.array,
        onGroupChange: PropTypes.func,
        onChange: PropTypes.func,
        onCancel: PropTypes.func,
        canceltext: PropTypes.string,
        confirmtext: PropTypes.string,
        title: PropTypes.string
    }

    static defaultProps = {
        groups: [],
        title: '',
        canceltext: '取消',
        confirmtext: '确定',
    }

    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.defaultSelect || Array(this.props.groups.length).fill(-1),
            closing: false,
            show: false,
        }
    }

    handleChanges = () => {
        this.closePicker(() => {
            this.props.onChange && this.props.onChange(this.state.selected, this)
        })
    }

    handleChange = (item, i, groupIndex) => {
        let selected = this.state.selected;

        selected[groupIndex] = i;
        this.setState({ selected }, () => {
            if (this.props.onGroupChange) {
                this.props.onGroupChange(item, i, groupIndex, this.state.selected, this)
            }
        })
    }

    closePicker = (callback) => {
        this.setState({
            closing: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    closing: false,
                    show: false
                })
                callback && callback()
            }, 300)
        })
    }

    handleClose = () => {
        this.closePicker(() => {
            this.props.onCancel && this.props.onCancel()
        })
    }

    handleOpen = () => {
        this.setState({
            show: true
        })
    }

    renderActions = () => {
        const { title } = this.props

        return (
            <div className="pandaui-picker__hd">
                <button className="pandaui-icon-btn pandaui-icon-btn_close pandaui-picker__close" onClick={this.handleClose}></button>
                {
                    title ? <span className="pandaui-picker__title">{title}</span> : null
                }
            </div>
        )
    }

    renderGroups = () => {
        return this.props.groups.map((group, i) => {
            return <PickerGroup key={i} {...group} onChange={this.handleChange} groupIndex={i} defaultIndex={this.state.selected[i]} />;
        })
    }

    preventDefault(evt) {
        if (evt) {
            evt.addEventListener('touchmove', function (e) {
                e.preventDefault()
            })
        }
    }

    render() {
        const { className, groups, defaultSelect, onGroupChange, onChange, onCancel, ...others } = this.props
        const { show } = this.state
        const cls = classNames('pandaui-picker', {
            'pandaui-animate-slide-up': show && !this.state.closing,
            'pandaui-animate-slide-down': this.state.closing
        }, className)

        const maskCls = classNames({
            'pandaui-animate-fade-in': show && !this.state.closing,
            'pandaui-animate-fade-out': this.state.closing
        })

        return (
            <>
                <div onClick={this.handleOpen}>
                    {this.props.children}
                </div>
                {
                    show ? (
                        <div>
                            <Mask className={maskCls} onClick={this.handleClose} />
                            <div className={cls} ref={this.preventDefault} {...others}>
                                {this.renderActions()}
                                <div className="pandaui-picker__bd">
                                    {this.renderGroups()}
                                </div>
                                <div className="pandaui-picker__ft">
                                    <span onClick={this.handleChanges} className="btn">{this.props.confirmtext}</span>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </>
        )
    }
}

export default Picker;