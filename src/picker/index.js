import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PickerGroup from './picker_group'
import Drawer from '../drawer'
import './style.scss'

class Picker extends Component {
    static propTypes = {
        data: PropTypes.array,
        value: PropTypes.array,
        onGroupChange: PropTypes.func,
        onChange: PropTypes.func,
        onCancel: PropTypes.func,
        confirmText: PropTypes.string,
        title: PropTypes.string,
        subTitle: PropTypes.string
    }

    static defaultProps = {
        data: [],
        title: '',
        subTitle: '',
        canceltext: '取消',
        confirmText: '确定',
    }

    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.value || Array(this.props.data.length).fill(-1),
            closing: false,
            show: false,
        }
    }

    handleChanges = () => {
        this.setState({
            show: false
        }, () => {
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

    handleClose = () => {
        this.setState({
            show: false
        }, () => {
            this.props.onCancel && this.props.onCancel()
        })
    }

    handleOpen = () => {
        this.setState({
            show: true
        })
    }

    renderGroups = () => {
        return this.props.data.map((group, i) => {
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
        const { className, data, value, title, subTitle,confirmText, onGroupChange, onChange, onCancel, ...others } = this.props
        const { show } = this.state

        return (
            <>
                <div onClick={this.handleOpen}>
                    {this.props.children}
                </div>
                <Drawer
                    show={show}
                    title={title}
                    subTitle={subTitle}
                    buttons={[{
                        label: confirmText,
                        onClick: this.handleChanges
                    }]}
                    onCancel={this.handleClose}
                >
                    <div className="pandaui-picker__bd">
                        {this.renderGroups()}
                    </div>
                </Drawer>
            </>
        )
    }
}

export default Picker;