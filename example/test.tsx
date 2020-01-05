import React from 'react'
import {
    Picker,
    PickerCascader,
    PickerDate,
    Spinner,
    Switch
} from './components'
import cnCity from './city'

const lists = [[{
    label: '火车1'
}, {
    label: '火车2',
    value: '22',
}, {
    label: '火车3',
    value: '33',
    disabled: true
}, {
    label: '火车4'
}], [{
    label: '火车1'
}, {
    label: '火车2',
    value: '22',
}, {
    label: '火车3',
    value: '33',
}, {
    label: '火车4'
}]]

const Test = () => {

    const [date, setDate] = React.useState('');
    const [address, setAddress] = React.useState([]);
    const [name, setName] = React.useState<number[]>([]);
    const [name1, setName1] = React.useState<number[]>([]);
    const [checked, setChecked] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    console.log(name)

    const onPickerChange = (data: any) => {
        setName(data)
    }

    const onChange = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setChecked(!checked)
        }, 1000)
    }

    return (
        <div>
            test
            <Spinner color="#000" type="spinner">加载中...</Spinner>
            <Spinner color="#000">加载中...</Spinner>
            <Spinner />
            <Spinner type="spinner" />
            <Spinner vertical>加载中...</Spinner>
            <div>
                <Switch
                    checked={checked}
                    loading={loading}
                    onChange={onChange}
                    // activeColor="red"
                    // inActiveColor="blue"
                    size={25}
                />
            </div>

            <Picker
                data={[{
                    label: '火车1'
                }, {
                    label: '火车2',
                    value: '22',
                }, {
                    label: '火车3',
                    value: '33'
                }]}
                value={name1}
                onChange={(data: any) => setName1(data)}
            >
                name: {name1.join('-') || '请选择'}
            </Picker>
            <Picker
                title="mutil-name"
                subTitle="mutil-name"
                data={lists}
                value={name}
                onChange={onPickerChange}
            >
                mutil-name: {name.join('-') || '请选择'}
            </Picker>
            <PickerCascader
                data={cnCity}
                value={address}
                onChange={(data: any) => setAddress(data.map((v: any) => v.label))}
            >
                PickerCascader: {address.join('-') || '请选择'}
            </PickerCascader>
            <PickerDate
                value={date}
                start="1919-10-01"
                end="2019-10-01"
                onChange={(date: any) => setDate(date.map((v: any) => v.value).join('-'))}
            >
                PickerDate: {date || '请选择'}
            </PickerDate>
        </div>
    )
}

export default Test;