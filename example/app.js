import React, { useState } from 'react'
import {
  ActionSheet,
  Avatar,
  Button,
  Dialog,
  Download,
  ListEmpty,
  Loading,
  Picker,
  CityPicker,
  Scroll,
  Skeleton,
  Toast,
} from 'pandaui-mobile'
import cnCity from './city'
import 'pandaui-mobile/lib/index.css'

let timer = null

function App() {
  const [show, setShow] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [cityShow, setCityShow] = useState(false)
  const [list, setList] = useState([...Array(20)])
  const [loadMore, setLoadMore] = useState(false)

  const onClickEmpty = () => {
    timer && clearTimeout(timer)
    setEmpty(true)
    timer = setTimeout(() => {
      setEmpty(false)
    }, 1000)
  }

  const selectPicker = () => {

  }

  const onScrollToEnd = () => {
    console.log(1)
    const _list = [...list, ...Array(20)]
    setList(_list)
    setLoadMore(_list.length > 120)
  }

  const onChangeCityPicker = () => {
    setCityShow(false)
  }

  return (
    <div className="App">
      <ListEmpty show={empty}>
        <Button loading>232</Button>
        <ActionSheet menus={['男', '女']} title="请选择性别">
          请选择
      </ActionSheet>
        <div onClick={() => Toast('hello')}>toast</div>
        <div onClick={() => Toast.success('hello')}>toast-success</div>
        <div>
          <Avatar icon="https://avatar-static.segmentfault.com/388/030/3880304376-54cef34ceff86_big64" vip></Avatar>
        </div>
        <div onClick={() => setShow(true)}>说明？</div>
        <div onClick={onClickEmpty}>ListEmpty</div>
        <div>
          <Picker
            className="panda-cell"
            title="出生日期"
            mode="date"
            value={'2019-12-21'}
            start="2019-12-01"
            end="2020-12-01"
            onChange={selectPicker}
          >请选择出生日期</Picker>
        </div>
        <div onClick={() => setCityShow(true)}>ciry-picker</div>
      </ListEmpty>
      <Skeleton avatar active loading={empty}>
        2323
      </Skeleton>
      <Download />
      <Loading show={empty} />
      <Dialog
        title="提示"
        show={show}
        buttons={[
          {
            label: '取消',
            onClick: () => setShow(false)
          },
          {
            label: '确定',
            onClick: () => setShow(false)
          }
        ]}
      >
        GitHub上。你可以fork 这个仓库进行修改或测
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
      <CityPicker
        data={cnCity}
        onCancel={e => setCityShow(false)}
        onChange={onChangeCityPicker}
        show={cityShow}
      />
    </div>
  );
}

export default App;