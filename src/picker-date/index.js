import React from 'react'
import PropTypes from 'prop-types'
import Picker from '../picker'
import { isArray } from '../utils/utils'
import { dateFormat, initPickerData } from './utils'

class PickerDate extends React.Component {

    static propTypes = {
        dataMap: PropTypes.object,
        value: PropTypes.string,
        confirmText: PropTypes.string,
        title: PropTypes.string,
        start: PropTypes.string,
        end: PropTypes.string,
        onChange: PropTypes.func,
        onCancel: PropTypes.func
    }

    static defaultProps = {
        dataMap: { id: 'label', items: 'children' },
        value: '',
        title: '',
        confirmText: '确定',
        start: dateFormat(new Date().setFullYear(dateFormat()[0] - 1)).join('-'),
        end: dateFormat().join('-')
    }

    constructor(props) {
        super(props);
        const { start, end, value, dataMap } = this.props
        const selected = typeof value == 'string' ? value.split('-') : []
        this.data = initPickerData({ start, end })
        const { groups, newselected } = this.parseData(this.data, dataMap.items, selected)

        this.state = {
            groups,
            selected: newselected,
            text: []
        }
    }

    parseData = (data, subKey, selected, group = [], newselected = [], num = 0) => {
        let _selected = 0;

        if (isArray(selected) && selected.length > 0) {
            if (typeof selected[num] == 'string') {
                const index = data.findIndex(v => v.value == selected[num])
                _selected = index == -1 ? 0 : index
            } else {
                _selected = selected[num]
            }
        }

        if (!data[_selected]) {
            _selected = 0
        }

        newselected.push(_selected)
        const item = data[_selected]

        var _group = JSON.parse(JSON.stringify(data))
        _group.forEach(g => delete g[subKey])
        group.push({ items: _group, mapKeys: { 'label': this.props.dataMap.id } })

        if (item[subKey] && isArray(item[subKey])) {
            num++
            return this.parseData(item[subKey], subKey, selected, group, newselected, num);
        } else {
            return { groups: group, newselected }
        }
    }

    updateDataBySelected = (selected, cb) => {
        const { dataMap } = this.props
        const { groups, newselected } = this.parseData(this.data, dataMap.items, selected)

        let text = []
        try {
            groups.forEach((group, _i) => {
                text.push(group['items'][selected[_i]].value)
            });
        } catch (err) {
            text = []
        }

        this.setState({
            groups,
            text,
            selected: newselected
        }, () => cb());
    }

    updateGroup = (item, i, groupIndex, selected, picker) => {
        this.updateDataBySelected(selected, () => {
            picker.setState({
                selected: this.state.selected
            });
        });
    }

    handleChange = (selected) => {
        if (selected === this.state.selected) {
            this.updateDataBySelected(selected, () => {
                this.props.onChange && this.props.onChange(this.state.text)
            })
        } else {
            this.props.onChange && this.props.onChange(this.state.text)
        }
    }

    render() {
        return (
            <Picker
                title={this.props.title}
                canceltext={this.props.canceltext}
                confirmText={this.props.confirmText}
                data={this.state.groups}
                value={this.state.selected}
                onGroupChange={this.updateGroup}
                onChange={this.handleChange}
                onCancel={this.props.onCancel}
            >{this.props.children}</Picker>
        )
    }
}

export default PickerDate;