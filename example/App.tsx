import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  ActionSheet,
  Avatar,
  Button,
  Dialog,
  Download,
  Popup,
  ListEmpty,
  Loading,
  Paragraph,
  Picker,
  PickerCascader,
  PickerDate,
  Scroll,
  Skeleton,
  Toast
} from '../src'

let timer: any = null;

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [empty, setEmpty] = useState(false)
  const [loadMore, setLoadMore] = useState(false)
  const [list, setList] = useState([...Array(20)])
  const [data, setData] = useState('加载中...')
  const [cityValue, setCityValue] = useState([{ label: "天津市", value: "CIT2" }, { label: "津南区", value: "DST252" }])

  const history = useHistory()

  useEffect(() => {
    setData('度网址大全 -- 简单可依赖的上网导航... 视频更多>>爱奇艺高清优酷网百度视频腾讯视频芒果TV搜狐视频 影视更多>>电视剧电影 • 购票动漫综艺电视直播院线大片 游...度网址大全 -- 简单可依赖的上网导航... 视频更多>>爱奇艺高清优酷网百度视频腾讯视频芒果TV搜狐视频 影视更多>>电视剧电影 • 购票动漫综艺电视直播院线大片 游')
  }, [])

  const onClickEmpty = () => {
    timer && clearTimeout(timer)
    setEmpty(true)
    timer = setTimeout(() => {
      setEmpty(false)
    }, 1000)
  }

  const onClickBtn = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    history.push('/test')
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
        expandRender={(expand) => <span>{expand ? '收起' : '展开'}</span>}
      >{data}</Paragraph>
      <Button loading={loading} onClick={onClickBtn}>text</Button>
      <Button loading={loading} onClick={() => history.push('/refresh')}>refresh</Button>
      <ListEmpty show={empty}>
        <ActionSheet menus={['男', '女']} title="请选择性别">ActionSheet</ActionSheet>
        <div>
          <Avatar icon="https://avatar-static.segmentfault.com/388/030/3880304376-54cef34ceff86_big64" vip />
        </div>
        <div onClick={() => setShow(true)}>说明？</div>
        <div onClick={() => Toast('hello')}>toast</div>
        <div onClick={() => Toast.success('hello')}>toast-success</div>
        <div onClick={onClickEmpty}>ListEmpty</div>
        <div onClick={() => setShow1(true)}>Popup</div>
      </ListEmpty>
      <Skeleton avatar active loading={empty}>
        2323
      </Skeleton>
      <Download />
      <Loading show={empty} />
      <Popup
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
      </Popup>
      <Dialog
        show={show}
        title="提示1"
        buttons={[{
          label: '知道了',
          onClick: () => setShow(false)
        }]}
      >
        232323
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