import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import PickerGroup from './pickerGroup'
import Popup from '../popup'

class Picker extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        value: PropTypes.array,
        title: PropTypes.string,
        subTitle: PropTypes.string,
        className: PropTypes.string,
        confirmText: PropTypes.string,
        onChange: PropTypes.func,
        onCancel: PropTypes.func,
        onGroupChange: PropTypes.func,
    }

    static defaultProps = {
        data: [],
        value: [],
        title: '',
        subTitle: '',
        className: '',
        confirmText: '确定',
        onChange: () => { },
        onCancel: () => { },
        onGroupChange: () => { }
    }

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.selected = Array.isArray(this.props.value) ? this.props.value : Array(this.props.data.length).fill(null)
    }

    handleChange = (item, index, groupIndex) => {
        this.selected[groupIndex] = index
        this.props.onGroupChange(item, index, groupIndex, this.selected, this)
    }

    renderGroups = () => {
        const selected = Array.isArray(this.props.value) ? this.props.value : Array(this.props.data.length).fill(null)

        if (Array.isArray(this.props.data[0])) {
            return this.props.data.map((item, i) => (
                <PickerGroup
                    key={i}
                    items={item}
                    groupIndex={i}
                    temp={+selected[i]}
                    onChange={this.handleChange}
                />
            ))
        } else {
            return (
                <PickerGroup
                    items={this.props.data}
                    groupIndex={0}
                    temp={+selected[0]}
                    onChange={this.handleChange}
                />
            )
        }
    }

    onChange = () => {
        this.setState({
            show: false
        }, () => {
            this.props.onChange(this.selected)
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

    render() {
        const { className, data, value, title, subTitle, confirmText, onGroupChange, onChange, onCancel, ...others } = this.props
        const { show } = this.state

        return (
            <>
                <div onClick={this.handleOpen}>
                    {this.props.children}
                </div>
                <Popup
                    show={show}
                    title={title}
                    subTitle={subTitle}
                    buttons={[{
                        label: confirmText,
                        onClick: this.onChange
                    }]}
                    onCancel={this.handleClose}
                >
                    <div className={classnames('pandaui-picker__bd', className)}>
                        {this.renderGroups()}
                    </div>
                </Popup>
            </>
        )
    }
}

export default Picker;