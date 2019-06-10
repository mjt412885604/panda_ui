import React from 'react'
import {
    ActionSheet,
    Avatar,
    Button,
    Dialog,
    Picker,
    Toast,
    TopTips,
    Download,
    Skeleton
} from '../dist/pandaui'
import '../dist/pandaui.css'
import './main.scss'


const actionMenus = ['a', 'b']

export default class App extends React.Component {
    state = {
        btnLoading: false,
        actionSheet: '请选择',
        dialogShow: false,
        start: '',
        skeleton: false
    }

    actionSheetChange = key => {
        this.setState({ actionSheet: actionMenus[key] })
    }

    btnClick = () => {
        this.setState({ btnLoading: true })
        setTimeout(() => this.setState({ btnLoading: false }), 3000)
    }

    skeletonClick = () => {
        this.setState({ skeleton: true })
        setTimeout(() => this.setState({ skeleton: false }), 2000)
    }

    render() {
        return (
            <div className="dev">
                <br />
                <ActionSheet
                    title="ActionSheet"
                    menus={actionMenus}
                    onChange={this.actionSheetChange}
                >ActionSheet: {this.state.actionSheet}</ActionSheet>
                <br />
                <Avatar vip />
                <br />
                <Button
                    loading={this.state.btnLoading} onClick={this.btnClick}
                >button</Button>
                <br />
                <div onClick={() => this.setState({ dialogShow: true })}>Dialog</div>
                <Dialog
                    title="Dialog"
                    show={this.state.dialogShow}
                    buttons={[{
                        label: '取消',
                        onClick: () => this.setState({ dialogShow: false })
                    }, {
                        label: '确定',
                        onClick: () => this.setState({ dialogShow: false })
                    }]}
                >Dialog</Dialog>
                <br />
                <Picker
                    title="就诊时间"
                    mode="date"
                    value={this.state.start}
                    start="1995-01-01"
                    end="2020-01-01"
                    onChange={e => this.setState({ start: e.detail.value })}
                >Picker: {this.state.start || '选择时间'}</Picker>
                <br />
                <div onClick={() => Toast('这是一个测试')}>Toast</div>
                <div onClick={() => TopTips('这是一个测试')}>TopTips</div>
                <Download />
                <br />
                <Skeleton avatar active loading={this.state.skeleton}>
                    <div onClick={this.skeletonClick}>Skeleton</div>
                </Skeleton>
            </div>
        )
    }
}