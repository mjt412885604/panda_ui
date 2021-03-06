import React from 'react'
import PropTypes from 'prop-types'
import Picker from '../picker'
import { dateFormat, initPickerData } from './utils'

class PickerDate extends React.Component {

    static propTypes = {
        value: PropTypes.oneOfType(
            [PropTypes.string, PropTypes.array]
        ),
        confirmText: PropTypes.string,
        title: PropTypes.string,
        subTitle: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
        onChange: PropTypes.func,
        onCancel: PropTypes.func
    }

    static defaultProps = {
        value: [],
        title: '',
        subTitle: '',
        confirmText: '确定',
        start: dateFormat(new Date().setFullYear(dateFormat()[0] - 1)).join('-'),
        end: dateFormat().join('-'),
        onChange: () => { },
        onCancel: () => { }
    }

    constructor(props) {
        super(props);
        const { start, end, value } = this.props
        this.data = initPickerData({ start, end })
        const _selected = typeof value == 'string' ? value.split('-') : []
        const { groups, selected } = this.initPickerData(this.data, _selected)
        this.state = {
            groups,
            selected
        }
        this.text = []
    }

    initPickerData = (data, selected = [], group = [], newselected = [], num = 0) => {
        let _selected = 0;

        if (Array.isArray(selected) && selected.length > 0 && selected[num]) {
            const item = selected[num]
            if (typeof item == 'string') {
                const index = data.findIndex(v => v.value == item)
                _selected = index == -1 ? 0 : index
            } else {
                _selected = item
            }
        }

        if (!data[_selected]) {
            _selected = 0
        }

        newselected.push(_selected)
        const item = data[_selected]

        group.push(data.map(({ children, ...reset }) => reset))

        if (item['children'] && Array.isArray(item['children'])) {
            num++
            return this.initPickerData(
                item['children'],
                selected,
                group,
                newselected,
                num
            )
        }
        return {
            groups: group,
            selected: newselected
        }
    }

    updateDataBySelected = (_selected, cb) => {
        const { groups, selected } = this.initPickerData(this.data, _selected)

        try {
            this.text = groups.map((group, i) => group[selected[i]])
        } catch (err) {
            this.text = []
        }

        this.setState({
            groups,
            selected
        }, cb)
    }

    onGroupChange = (item, i, groupIndex, selected, picker) => {
        this.updateDataBySelected(selected, () => {
            picker.selected = this.state.selected
        })
    }

    handleChange = (selected) => {
        if (selected == this.state.selected) {
            this.updateDataBySelected(selected, () => {
                this.props.onChange(this.text)
            })
        } else {
            this.props.onChange(this.text)
        }
    }

    render() {
        return (
            <Picker
                title={this.props.title}
                subTitle={this.props.subTitle}
                canceltext={this.props.canceltext}
                confirmText={this.props.confirmText}
                data={this.state.groups}
                value={this.state.selected}
                onGroupChange={this.onGroupChange}
                onChange={this.handleChange}
                onCancel={this.props.onCancel}
            >{this.props.children}</Picker>
        )
    }
}

export default PickerDate;