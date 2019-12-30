import React, { useState, useMemo } from 'react'
import cnCity from './city'
import {
  ActionSheet,
  Avatar,
  Button,
  Dialog,
  Download,
  ListEmpty,
  Loading,
  Picker,
  PickerCity,
  PickerDate,
  Scroll,
  Skeleton,
  Toast
} from './components'

let timer: any = null;

// 背景：移动端的通用组件比如，toast、button、dailog、loading都是自己封装的组件，平时对组件的样式、逻辑进行优化的时候就需要每个项目都要更改，无法按照版本进行统一维护，对于项目的搭建也不方便，所以计划将移动端自有组件进行抽离封装。
// 价值：方便组件库的维护，如：升级、bug修复、版本统一控制，同时也对以后的多部门协作提高效率
// 目标：逐步替换web移动端通用组件、做的好的话也能小范围内开源，提升大家对组件开发的认知

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [list, setList] = useState([...Array(20)])
  const [cityValue, setCityValue] = useState([{ label: "天津市", value: "CIT2" }, { label: "津南区", value: "DST252" }])

  const onClickEmpty = () => {
    timer && clearTimeout(timer)
    setEmpty(true)
    timer = setTimeout(() => {
      setEmpty(false)
    }, 1000)
  }

  const selectPicker = (data: any) => {
    console.log(data)
  }

  const onChangeCityPicker = (value: any) => {
    setCityValue(value)
  }

  const onScrollToEnd = () => {
    const _list = [...list, ...Array(20)]
    setList(_list)
    setLoadMore(_list.length > 120)
  }

  return (
    <div className="App">
      <ListEmpty show={empty}>
        <Button loading>232</Button>
        <ActionSheet menus={['男', '女']} title="请选择性别">
          请选择
      </ActionSheet>
        <div>
          <Avatar icon="https://avatar-static.segmentfault.com/388/030/3880304376-54cef34ceff86_big64" vip />
        </div>
        <div onClick={() => setShow(true)}>说明？</div>
        <div onClick={() => Toast('hello')}>toast</div>
        <div onClick={() => Toast.success('hello')}>toast-success</div>
        <div onClick={onClickEmpty}>ListEmpty</div>
        <PickerDate
          // title="出生日期"
          value={'2019-05-01'}
          start="1986-10-10"
          onChange={date => console.log(date)}
        >
          出生日期
        </PickerDate>
        <PickerCity
          title="选择城市"
          data={cnCity}
          value={cityValue}
          onChange={onChangeCityPicker}
        >
          ciry-picker
        </PickerCity>
        <Picker
          title="选择城市"
          data={[{
            items: [{
              label: '火车',
              value: '火车'
            }, {
              label: '火车',
              value: '火车'
            }]
          }, {
            items: [{
              label: '火车',
              value: '火车'
            }, {
              label: '火车',
              value: '火车'
            }]
          }]}
          value={[]}
          onChange={selectPicker}
        >
          火车
        </Picker>
      </ListEmpty>
      <Skeleton avatar active loading={empty}>
        2323
      </Skeleton>
      <Download />
      <Loading show={empty} />
      <Dialog
        show={show}
        title="提示"
        buttons={[{
          label: '知道了',
          onClick: () => setShow(false)
        }]}
      >
        erereer
      </Dialog>
      <Scroll
        data={list}
        loadMore={loadMore}
        onScrollToEnd={onScrollToEnd}
      >
        {
          list.map((itm, index) => (
            <div style={{ height: 40 }} key={index}>{index}</div>
          ))
        }
      </Scroll>
    </div>
  );
}

export default App;
