import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import cnCity from './city'
import {
  ActionSheet,
  Avatar,
  Button,
  Dialog,
  Download,
  Drawer,
  ListEmpty,
  Loading,
  Paragraph,
  Picker,
  PickerCity,
  PickerDate,
  Scroll,
  Skeleton,
  Toast
} from './lib'

let timer: any = null;

// 背景：移动端的通用组件比如，toast、button、dailog、loading都是自己封装的组件，平时对组件的样式、逻辑进行优化的时候就需要每个项目都要更改，无法按照版本进行统一维护，对于项目的搭建也不方便，所以计划将移动端自有组件进行抽离封装。
// 价值：方便组件库的维护，如：升级、bug修复、版本统一控制，同时也对以后的多部门协作提高效率
// 目标：逐步替换web移动端通用组件、做的好的话也能小范围内开源，提升大家对组件开发的认知

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [show1, setShow1] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [data, setData] = useState('')
  const [list, setList] = useState([...Array(20)])
  const [cityValue, setCityValue] = useState([{ label: "天津市", value: "CIT2" }, { label: "津南区", value: "DST252" }])

  const history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      setData('copy-to-clipboard插件 X_Satan关注 2019.03.29 14:00:45字数77阅读266 copy()方法copy()方法不能放置在setTimeout定时器或者异步加载的then里,这样会copy-to-clipboard插件 X_Satan关注 2019.03.29 14:00:45字数77阅读266 copy()方法copy()方法不能放置在setTimeout定时器或者异步加载的then里,这样会')
    }, 1500)
  }, [])

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
      <Paragraph
        rows={3}
        style={{ padding: 15 }}
        expandRender={(expand) => <span>{expand ? '收起' : '展开'}</span>}
      >{data}</Paragraph>
      <ListEmpty show={empty}>
        <Paragraph
          rows={3}
          style={{ padding: 15 }}
          expandRender={(expand) => <span>{expand ? '收起' : '展开'}</span>}
        >{data}</Paragraph>
        <Button onClick={() => history.push('/test')}>232</Button>
        <ActionSheet menus={['男', '女']} title="请选择性别">
          <span>请选择</span>
        </ActionSheet>
        <div>
          <Avatar icon="https://avatar-static.segmentfault.com/388/030/3880304376-54cef34ceff86_big64" vip />
        </div>
        <div onClick={() => setShow(true)}>说明？</div>
        <div onClick={() => Toast('hello')}>toast</div>
        <div onClick={() => Toast.success('hello')}>toast-success</div>
        <div onClick={onClickEmpty}>ListEmpty</div>
        <div onClick={() => setShow1(true)}>Drawer</div>
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
          subTitle="选择城市"
          data={cnCity}
          value={cityValue}
          onChange={onChangeCityPicker}
        >
          ciry-picker
        </PickerCity>
        <Picker
          title="选择城市"
          subTitle="选择城市"
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
        scroll
        show={show}
        title="提示"
        buttons={[{
          label: '知道了',
          onClick: () => setShow(false)
        }]}
      >
        <ol className="dialog-content-box">
          <li>健康卡只可在有效期内使用；</li>
          <li>健康卡仅限在熊猫儿科平台使用或绑定，不可进行兑现、找零或其他用途使用；</li>
          <li>健康卡绑定后，对应的套餐内容或服务将绑定至用户账户内；</li>
          <li>健康卡中包含的预约服务，有两种预约方式，①线上直接点击预约，健康顾问电话回访确认信息；②拨打客服热线4006625588，进行电话预约。</li>
          <li>使用健康卡的订单，如发生退费，系统将自动返还与退费有效期相同的产品或服务；</li>
          <li>健康卡抵扣金额，不能开具发票；</li>
          <li>健康卡为非实名卡，请妥善保管，如被他人使用，平台不予负责；</li>
          <li>熊猫儿科在法律范围内保留对健康卡使用细则的最终解释权。</li>
        </ol>
      </Dialog>
      <Drawer
        scroll
        show={show1}
        title="title"
        subTitle="subTitle"
        onCancel={() => setShow1(false)}
        buttons={[{
          label: '取消',
          type: 'default',
          onClick: () => setShow1(false)
        }, {
          label: '确定',
          onClick: () => setShow1(false)
        }]}
      >
        健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；健康卡只可在有效期内使用；
      </Drawer>
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