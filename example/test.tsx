import React from 'react'
import {
    Picker,
    PickerCascader,
    PickerDate,
    Spinner,
    Switch,
    CheckBox,
    ImgLazy
} from './components'
import cnCity from './city'
import { throttle } from './components/utils/utils'

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

const imgList = [
    'http://pddoc4comm.oss-cn-beijing.aliyuncs.com/%E5%8C%BB%E9%99%A2%E7%B4%A0%E6%9D%90/%E6%96%B0%E4%B8%96%E7%BA%AA%E5%84%BF%E7%AB%A5.jpg',
    'http://pddoc4comm.oss-cn-beijing.aliyuncs.com/baby/content/article/4b0006528da54d6da0fc10facc041965.jpg',
    'http://pddoc4comm.oss-cn-beijing.aliyuncs.com/%E5%8C%BB%E9%99%A2%E7%B4%A0%E6%9D%90/%E6%80%A1%E5%BE%B71.png',
    'http://pddoc4comm.oss-cn-beijing.aliyuncs.com/%E5%8C%BB%E9%99%A2%E7%B4%A0%E6%9D%90/%E8%8D%A3%E5%92%8C1.png',
    'http://pddoc4comm.oss-cn-beijing.aliyuncs.com/%E5%8C%BB%E9%99%A2%E7%B4%A0%E6%9D%90/%E6%80%A1%E5%BE%B73.jpg',
    'http://pddoc4comm.oss-cn-beijing.aliyuncs.com/%E5%8C%BB%E9%99%A2%E7%B4%A0%E6%9D%90/%E5%A5%A5%E4%B8%9C1.png'
]

const Test = () => {

    const [date, setDate] = React.useState('');
    const [address, setAddress] = React.useState([]);
    const [name, setName] = React.useState<number[]>([]);
    const [name1, setName1] = React.useState<number[]>([]);
    const [checked, setChecked] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [checkbox, setCheckbox] = React.useState(false);
    const lazyImg = React.useRef<any>(null)

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
                    // disabled
                    checked={checked}
                    loading={loading}
                    onChange={onChange}
                    activeColor="red"
                    inActiveColor="blue"
                    size={25}
                />
                <Switch
                    disabled
                    checked={checked}
                    loading={loading}
                    onChange={onChange}
                    size={25}
                />
            </div>

            <div>
                <CheckBox
                    type="round"
                    checked={checkbox}
                    onChange={() => setCheckbox(!checkbox)}
                    style={{ width: 25, height: 25 }}
                />
                <CheckBox
                    type="round"
                    checked={checkbox}
                    onChange={() => setCheckbox(!checkbox)}
                >
                    sdsds
                </CheckBox>
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
            {
                [...Array(20)].map((item, i) => (
                    <div style={{ height: 40 }} key={i}>{i}</div>
                ))
            }
            <div className="img" ref={elm => lazyImg.current = elm}>lazy-img</div>
            {
                imgList.map((src, idx) => (
                    <div key={idx} >
                        <ImgLazy style={{width: '100%'}} src={src} />
                    </div>

                ))
            }
        </div>
    )
}

export default Test;