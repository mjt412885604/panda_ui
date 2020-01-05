import React from 'react'
import PropTypes from 'prop-types'
import Picker from '../picker'
import { isObject, isArray } from './utils'

class PickerCascader extends React.Component {

    static propTypes = {
        value: PropTypes.oneOfType(
            [PropTypes.string, PropTypes.array]
        ),
        data: PropTypes.array,
        confirmText: PropTypes.string,
        title: PropTypes.string,
        subTitle: PropTypes.string,
        onChange: PropTypes.func,
    }

    static defaultProps = {
        data: [],
        value: [],
        title: '',
        subTitle: '',
        confirmText: '确定',
        onChange: () => { }
    }

    constructor(props) {
        super(props);
        const { data, value } = this.props
        const { groups, selected } = this.initPickerData(data, value)
        this.state = {
            groups,
            selected
        }
        this.text = []
    }

    initPickerData = (data, selected = [], group = [], newselected = [], num = 0) => {
        let _selected = 0;

        if (isArray(selected) && selected.length > 0 && selected[num]) {
            const item = selected[num]
            if ((isObject(item) && item.label) || typeof item == 'string') {
                const index = data.findIndex(v => v.label == (typeof item == 'string' ? item : item.label))
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

        group.push(data.map(({ children, ...reset }) => reset))

        if (item['children'] && isArray(item['children'])) {
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
        const { groups, selected } = this.initPickerData(this.props.data, _selected)

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
        if (selected === this.state.selected) {
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

export default PickerCascader;