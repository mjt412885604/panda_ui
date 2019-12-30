import React from 'react'
import PropTypes from 'prop-types'
import Picker from '../picker'
import { isObject, isArray } from '../utils/utils'

class PickerCity extends React.Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        dataMap: PropTypes.object,
        value: PropTypes.array,
        confirmText: PropTypes.string,
        title: PropTypes.string
    }

    static defaultProps = {
        data: [],
        dataMap: { id: 'label', items: 'children' },
        value: [],
        title: '',
        confirmText: '确定',
    }

    constructor(props) {
        super(props);
        const { data, value, dataMap } = this.props;
        const { groups, newselected } = this.parseData(data, dataMap.items, value);
        this.state = {
            groups,
            selected: newselected,
            text: []
        }
    }

    parseData = (data, subKey, selected = [], group = [], newselected = [], num = 0) => {
        let _selected = 0;

        if (isArray(selected) && selected.length > 0) {
            if (isObject(selected[num])) {
                const index = data.findIndex(v => v.label == selected[num].label)
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
        const { data, dataMap } = this.props
        const { groups, newselected } = this.parseData(data, dataMap.items, selected)

        let text = []
        try {
            groups.forEach((group, _i) => {
                text.push(group['items'][selected[_i]])
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
            //update picker
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

export default PickerCity;