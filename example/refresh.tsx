import React from 'react'
import {
    PullRefresh
} from '../src'


const Refresh = () => {
    const [loading, setLoading] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [list1, setList1] = React.useState(20)
    const [list2, setList2] = React.useState(20)

    const onRefresh1 = (onClose) => {
        setTimeout(() => {
            setList1(list1 + 10)
            onClose()
        }, 1000)
    }

    const onRefresh2 = (onClose) => {
        setTimeout(() => {
            setList2(list2 + 10)
            onClose()
        }, 1000)
    }

    return (
        <div>
            <div className="table-list">
                {
                    ['基础用法', '基础用法1'].map((item, index) => (
                        <div onClick={() => setActiveIndex(index)} className={`table-item ${activeIndex == index ? 'active' : ''}`} key={index}>{item}</div>
                    ))
                }
            </div>
            <div style={{ height: 50 }}></div>
            <PullRefresh
                onRefresh={onRefresh1}
                style={{ display: activeIndex == 0 ? 'block' : 'none' }}
            >
                {
                    [...Array(list1)].map((itm, index) => (
                        <div style={{ height: 80 }} key={index}>{index}</div>
                    ))
                }
            </PullRefresh>
            <PullRefresh
                onRefresh={onRefresh2}
                style={{ display: activeIndex == 1 ? 'block' : 'none' }}
            >
                {
                    [...Array(list2)].map((itm, index) => (
                        <div style={{ height: 80 }} key={index}>{index}</div>
                    ))
                }
            </PullRefresh>
        </div>
    )
}

export default Refresh;