import React, { useState } from 'react'
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
  CityPicker,
  Scroll,
  Skeleton,
  Toast
} from './lib'
import './lib/index.css'

let timer: any = null;

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [cityShow, setCityShow] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [list, setList] = useState([...Array(20)])

  const onClickEmpty = () => {
    timer && clearTimeout(timer)
    setEmpty(true)
    timer = setTimeout(() => {
      setEmpty(false)
    }, 1000)
  }

  const selectPicker = () => {

  }

  const onChangeCityPicker = () => {
    setCityShow(false)
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
        show={show}
        title="提示"
        buttons={[{
          label: '知道了',
          onClick: () => setShow(false)
        }]}
      >
        erereer
      </Dialog>
      <CityPicker
        data={cnCity}
        selected={[]}
        onCancel={() => setCityShow(false)}
        onChange={onChangeCityPicker}
        show={cityShow}
      />
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